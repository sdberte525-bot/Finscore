"use client";

import type { Texture, WebGLRenderer, ShaderMaterial, Scene, OrthographicCamera } from "three";
import { gsap } from "@/lib/motion";

/*
 * One shared WebGL canvas for every product tile. On hover it moves into the
 * tile, then bleeds the front image into the hover image through noise.
 * Pointer-fine devices only; everything else uses the CSS crossfade.
 */

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uA;
  uniform sampler2D uB;
  uniform vec2 uRes;
  uniform vec2 uSizeA;
  uniform vec2 uSizeB;
  uniform float uHover;
  uniform float uTime;

  float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.07; a *= 0.5; } return v; }

  vec2 cover(vec2 uv, vec2 res, vec2 size) {
    float r = res.x / res.y;
    float t = size.x / size.y;
    vec2 scale = r > t ? vec2(1.0, t / r) : vec2(r / t, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
    float n = fbm(vUv * aspect * 3.0 + uTime * 0.05);
    float front = uHover * 1.4 - 0.2;
    float m = smoothstep(front - 0.1, front + 0.1, n);
    float band = m * (1.0 - m) * 4.0;
    vec2 disp = (vec2(n, fbm(vUv * 5.0 + 2.0)) - 0.5) * band * 0.06;

    vec2 ua = cover(vUv, uRes, uSizeA);
    ua = (ua - 0.5) * (1.0 - 0.035 * uHover) + 0.5;
    vec2 ub = cover(vUv, uRes, uSizeB);
    ub = (ub - 0.5) * (1.04 - 0.04 * uHover) + 0.5;

    vec4 a = texture2D(uA, ua + disp);
    vec4 b = texture2D(uB, ub - disp);
    gl_FragColor = mix(b, a, m);
  }
`;

type Gl = {
  renderer: WebGLRenderer;
  material: ShaderMaterial;
  scene: Scene;
  camera: OrthographicCamera;
  canvas: HTMLCanvasElement;
  load: (src: string) => Promise<Texture>;
};

let gl: Promise<Gl | null> | null = null;
let owner: HTMLElement | null = null;
let frame = 0;
const start = performance.now();

export function canDistort(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function init(): Promise<Gl | null> {
  if (gl) return gl;
  gl = import("three").then((THREE) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;";
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const material = new THREE.ShaderMaterial({
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
        fragmentShader: fragment,
        uniforms: {
          uA: { value: null },
          uB: { value: null },
          uRes: { value: new THREE.Vector2(1, 1) },
          uSizeA: { value: new THREE.Vector2(1, 1) },
          uSizeB: { value: new THREE.Vector2(1, 1) },
          uHover: { value: 0 },
          uTime: { value: 0 },
        },
      });
      const scene = new THREE.Scene();
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const cache = new Map<string, Promise<Texture>>();
      const loader = new THREE.TextureLoader();
      const load = (src: string) => {
        let t = cache.get(src);
        if (!t) {
          t = loader.loadAsync(src).then((tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            return tex;
          });
          cache.set(src, t);
        }
        return t;
      };
      return { renderer, material, scene, camera, canvas, load };
    } catch {
      return null;
    }
  });
  return gl;
}

function loop(g: Gl) {
  cancelAnimationFrame(frame);
  const tick = () => {
    g.material.uniforms.uTime.value = (performance.now() - start) / 1000;
    g.renderer.render(g.scene, g.camera);
    frame = requestAnimationFrame(tick);
  };
  tick();
}

/** Starts the hover effect inside `tile`. Resolves false if WebGL isn't available. */
export async function enter(tile: HTMLElement, srcA: string, srcB: string): Promise<boolean> {
  const g = await init();
  if (!g) return false;
  owner = tile;
  const [a, b] = await Promise.all([g.load(srcA), g.load(srcB)]);
  if (owner !== tile) return true;

  const u = g.material.uniforms;
  const rect = tile.getBoundingClientRect();
  g.renderer.setSize(rect.width, rect.height, false);
  u.uRes.value.set(rect.width, rect.height);
  u.uA.value = a;
  u.uB.value = b;
  const ia = a.image as HTMLImageElement;
  const ib = b.image as HTMLImageElement;
  u.uSizeA.value.set(ia.width, ia.height);
  u.uSizeB.value.set(ib.width, ib.height);
  if (g.canvas.parentElement !== tile) {
    gsap.killTweensOf(u.uHover);
    u.uHover.value = 0;
    tile.appendChild(g.canvas);
  }
  g.canvas.style.opacity = "1";
  loop(g);
  gsap.to(u.uHover, { value: 1, duration: 1.1, ease: "power3.out" });
  return true;
}

export async function leave(tile: HTMLElement) {
  const g = await init();
  if (!g || owner !== tile) return;
  const u = g.material.uniforms;
  gsap.to(u.uHover, {
    value: 0,
    duration: 0.8,
    ease: "power3.out",
    onComplete: () => {
      if (owner !== tile) return;
      g.canvas.style.opacity = "0";
      cancelAnimationFrame(frame);
      owner = null;
    },
  });
}
