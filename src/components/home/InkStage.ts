import {
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three";

/*
 * Renders grayscale ink maps (white = ink) as screen prints on the page
 * background. Transitions between prints bleed through fractal noise, and
 * `wear` erodes the ink the way a print fades after hundreds of washes.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uA;
  uniform sampler2D uB;
  uniform vec2 uSizeA;
  uniform vec2 uSizeB;
  uniform vec4 uRect;      // art slot in device px, bottom-left origin
  uniform float uScale;
  uniform float uMix;      // 0 shows A, 1 shows B
  uniform float uWear;     // 0 fresh print, 1 fully worn away
  uniform float uTime;
  uniform vec2 uMouse;     // -1..1
  uniform vec3 uPaper;
  uniform vec3 uInk;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + 17.1;
      a *= 0.5;
    }
    return v;
  }

  float ink(sampler2D tex, vec2 size, vec2 px) {
    vec2 slot = uRect.zw * uScale;
    vec2 origin = uRect.xy + (uRect.zw - slot) * 0.5;
    float s = min(slot.x / size.x, slot.y / size.y);
    vec2 fit = size * s;
    vec2 uv = (px - origin - (slot - fit) * 0.5) / fit;
    if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 0.0;
    return smoothstep(0.16, 0.82, texture2D(tex, uv).r);
  }

  void main() {
    vec2 px = gl_FragCoord.xy;
    float unit = uRect.w;
    vec2 q = px / unit;

    // Slow drift plus a little pointer parallax.
    vec2 shift = uMouse * vec2(-10.0, 7.0) * (unit / 600.0);

    // Ink bleeds along the transition front.
    float n = fbm(q * 3.4 + vec2(0.0, uTime * 0.04));
    float front = uMix * 1.35 - 0.2;
    float m = smoothstep(front - 0.07, front + 0.07, n);
    float band = m * (1.0 - m) * 4.0;
    vec2 bleed = (vec2(fbm(q * 9.0), fbm(q * 9.0 + 4.3)) - 0.5) * band * unit * 0.05;

    float a = ink(uA, uSizeA, px + shift + bleed);
    float b = ink(uB, uSizeB, px + shift - bleed);
    float v = mix(b, a, m);

    // Wear: coarse blotches plus fine fibres, so it erodes like cotton, not a dissolve.
    // 0 keeps every pixel of ink, 1 removes it all.
    float wear = clamp(fbm(q * 2.6 + 3.0) * 0.75 + noise(q * 70.0) * 0.25 - v * 0.06, 0.0, 1.0);
    float t = uWear * 1.15 - 0.12;
    v *= smoothstep(t - 0.04, t + 0.04, wear);

    vec3 col = mix(uPaper, uInk, v);
    float grain = hash(px + fract(uTime * 7.0) * 113.0) - 0.5;
    col += grain * 0.03;
    vec2 c = vUv - 0.5;
    col *= 1.0 - dot(c, c) * 0.28;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToVec3(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export type InkStageOptions = {
  canvas: HTMLCanvasElement;
  slot: HTMLElement;
  maps: string[];
  paper: string;
  ink: string;
};

export class InkStage {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private material: ShaderMaterial;
  private textures: Texture[] = [];
  private slot: HTMLElement;
  private canvas: HTMLCanvasElement;
  private frame = 0;
  private running = false;
  private start = performance.now();
  private mouse = new Vector2();
  private mouseTarget = new Vector2();
  private resizeObserver: ResizeObserver;
  current = 0;

  constructor({ canvas, slot, maps, paper, ink }: InkStageOptions) {
    this.canvas = canvas;
    this.slot = slot;
    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uA: { value: null },
        uB: { value: null },
        uSizeA: { value: new Vector2(1, 1) },
        uSizeB: { value: new Vector2(1, 1) },
        uRect: { value: new Vector4() },
        uScale: { value: 1 },
        uMix: { value: 0 },
        uWear: { value: 1 },
        uTime: { value: 0 },
        uMouse: { value: this.mouse },
        uPaper: { value: hexToVec3(paper) },
        uInk: { value: hexToVec3(ink) },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.scene.add(new Mesh(new PlaneGeometry(2, 2), this.material));
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.resizeObserver.observe(slot);
    this.load(maps);
  }

  get uniforms() {
    return this.material.uniforms;
  }

  private ready!: Promise<void>;
  whenReady() {
    return this.ready;
  }

  private load(maps: string[]) {
    const loader = new TextureLoader();
    this.ready = Promise.all(
      maps.map(
        (src) =>
          new Promise<Texture>((resolve, reject) => {
            loader.load(
              src,
              (t) => {
                t.minFilter = LinearMipmapLinearFilter;
                t.magFilter = LinearFilter;
                t.generateMipmaps = true;
                resolve(t);
              },
              undefined,
              reject,
            );
          }),
      ),
    ).then((textures) => {
      this.textures = textures;
      this.setPair(0, 1 % textures.length);
      this.resize();
    });
  }

  private setPair(a: number, b: number) {
    const ta = this.textures[a];
    const tb = this.textures[b];
    const img = (t: Texture) => t.image as HTMLImageElement;
    this.uniforms.uA.value = ta;
    this.uniforms.uB.value = tb;
    (this.uniforms.uSizeA.value as Vector2).set(img(ta).width, img(ta).height);
    (this.uniforms.uSizeB.value as Vector2).set(img(tb).width, img(tb).height);
  }

  /** Call when a transition to `next` begins; uMix should then be tweened 0 to 1. */
  prepare(next: number) {
    this.setPair(this.current, next);
    this.uniforms.uMix.value = 0;
  }

  /** Call when uMix reaches 1. */
  commit(next: number) {
    this.current = next;
    this.setPair(next, next);
    this.uniforms.uMix.value = 0;
  }

  get count() {
    return this.textures.length;
  }

  pointer(x: number, y: number) {
    this.mouseTarget.set(x, y);
  }

  resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    const dpr = this.renderer.getPixelRatio();
    const c = this.canvas.getBoundingClientRect();
    const s = this.slot.getBoundingClientRect();
    (this.uniforms.uRect.value as Vector4).set(
      (s.left - c.left) * dpr,
      (c.bottom - s.bottom) * dpr,
      s.width * dpr,
      s.height * dpr,
    );
    if (!this.running) this.render();
  }

  private render = () => {
    this.mouse.lerp(this.mouseTarget, 0.05);
    this.uniforms.uTime.value = (performance.now() - this.start) / 1000;
    this.renderer.render(this.scene, this.camera);
  };

  private loop = () => {
    this.render();
    this.frame = requestAnimationFrame(this.loop);
  };

  play() {
    if (this.running) return;
    this.running = true;
    this.loop();
  }

  pause() {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }

  renderOnce() {
    this.render();
  }

  dispose() {
    this.pause();
    this.resizeObserver.disconnect();
    this.textures.forEach((t) => t.dispose());
    this.material.dispose();
    this.renderer.dispose();
  }
}
