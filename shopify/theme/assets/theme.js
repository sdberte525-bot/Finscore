/*
 * Swolvation theme behaviour. Plain JavaScript, no build step.
 * Ported from the Next.js site's React components so the storefront looks and moves the same:
 * Lenis smooth scrolling with GSAP reveals, the header and mobile menu, search, the cart drawer
 * (Shopify Cart API + Section Rendering API), product cards, the product gallery and viewer,
 * variant selection, the size finder, the film player, the email popup and sign-up forms.
 *
 * Every class name toggled here is written out in full so Tailwind compiles it into theme.css.
 */
(() => {
  "use strict";

  const config = window.Swolvation || { storeOpen: true, routes: {} };
  const routes = Object.assign(
    { root: "/", cart: "/cart", cartAdd: "/cart/add", cartChange: "/cart/change", search: "/search" },
    config.routes || {},
  );

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = () => window.matchMedia("(pointer: fine)").matches;
  const swap = (el, remove, add) => {
    if (!el) return;
    el.classList.remove(...remove.split(" ").filter(Boolean));
    el.classList.add(...add.split(" ").filter(Boolean));
  };
  const store = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {}
    },
  };

  /* ---------------------------------------------------------------- Money */

  function formatMoney(cents) {
    const format = config.moneyFormat || "${{amount}}";
    const value = Number(cents) / 100;
    const whole = Number(cents) % 100 === 0;
    const withDelimiters = (n, decimals, thousands, decimal) => {
      const [int, frac] = n.toFixed(decimals).split(".");
      const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
      return frac ? grouped + decimal + frac : grouped;
    };
    return format.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => {
      switch (key) {
        case "amount_no_decimals":
          return withDelimiters(value, 0, ",", ".");
        case "amount_with_comma_separator":
          return withDelimiters(value, whole ? 0 : 2, ".", ",");
        case "amount_no_decimals_with_comma_separator":
          return withDelimiters(value, 0, ".", ",");
        case "amount_with_apostrophe_separator":
          return withDelimiters(value, whole ? 0 : 2, "'", ".");
        default:
          // Matches Shopify's money_without_trailing_zeros: $54, $54.50
          return withDelimiters(value, whole ? 0 : 2, ",", ".");
      }
    });
  }

  /* ---------------------------------------------------- Scroll and motion */

  const scroller = { lenis: null, locks: 0 };

  function lockScroll(locked) {
    scroller.locks = Math.max(0, scroller.locks + (locked ? 1 : -1));
    const on = scroller.locks > 0;
    if (scroller.lenis) on ? scroller.lenis.stop() : scroller.lenis.start();
    document.documentElement.style.overflow = on ? "hidden" : "";
  }

  function scrollToEl(el, offset = -200) {
    if (!el) return;
    if (scroller.lenis) scroller.lenis.scrollTo(el, { offset });
    else el.scrollIntoView({ block: "center", behavior: reducedMotion() ? "auto" : "smooth" });
  }

  function initSmoothScroll() {
    const { gsap, ScrollTrigger, Lenis } = window;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: "power3.out", duration: 0.9 });
    }
    if (reducedMotion() || !Lenis || window.Shopify?.designMode) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -72 } });
    scroller.lenis = lenis;
    if (gsap && ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  /**
   * Restrained scroll motion, as on the Next site:
   *   [data-reveal]    image frames unmask upward once, as they enter
   *   [data-parallax]  image layers drift a few percent while in view
   *   [data-rise]      text blocks fade up once
   *   [data-reveal-tile] product tiles fade up, staggered
   *   [data-hero]      the homepage intro timeline
   */
  function initMotion(root = document) {
    const { gsap } = window;
    if (!gsap || !window.ScrollTrigger || reducedMotion()) return;

    $$("[data-reveal]", root).forEach((el) => {
      if (el.dataset.motion) return;
      el.dataset.motion = "1";
      gsap.fromTo(
        el,
        { clipPath: "inset(14% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
      );
    });
    $$("[data-parallax]", root).forEach((el) => {
      if (el.dataset.motion) return;
      el.dataset.motion = "1";
      gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true } });
    });
    $$("[data-rise]", root).forEach((el) => {
      if (el.dataset.motion) return;
      el.dataset.motion = "1";
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
      );
    });
    $$("[data-reveal-tiles]", root).forEach((group) => {
      $$("[data-reveal-tile]", group).forEach((tile, i) => {
        if (tile.dataset.motion) return;
        tile.dataset.motion = "1";
        gsap.from(tile, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          delay: (i % 4) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: tile, start: "top 90%", once: true },
        });
      });
    });
    $$("[data-hero]", root).forEach((hero) => {
      if (hero.dataset.motion) return;
      hero.dataset.motion = "1";
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from($$("[data-hero-media]", hero), { opacity: 0, scale: 1.04, duration: 1.4 }, 0)
        .from($$("[data-hero-word]", hero), { yPercent: 105, duration: 0.9, stagger: 0.07 }, 0.15)
        .from($$("[data-hero-fade]", hero), { opacity: 0, y: 12, duration: 0.7, stagger: 0.08 }, 0.55);
    });
  }

  /* --------------------------------------------------------- Loop videos */

  /**
   * A muted, looping video over its poster. Loads once near the viewport, pauses when off
   * screen, holds on the poster with reduced motion or while [data-paused] is set.
   */
  function initLoopVideos(root = document) {
    $$("[data-loop-video]", root).forEach((wrap) => {
      if (wrap._loop) return;
      const video = $("video", wrap);
      if (!video) return;
      const state = { near: false, visible: false };
      const update = () => {
        if (reducedMotion()) return;
        const paused = wrap.hasAttribute("data-paused");
        if (state.near && !video.getAttribute("src")) video.src = video.dataset.src;
        if (state.near && state.visible && !paused) video.play().catch(() => {});
        else video.pause();
        if (paused) swap(video, "opacity-100", "opacity-0");
        else if (video.dataset.ready) swap(video, "opacity-0", "opacity-100");
      };
      video.addEventListener("playing", () => {
        video.dataset.ready = "1";
        if (!wrap.hasAttribute("data-paused")) swap(video, "opacity-0", "opacity-100");
      });
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) state.near = true;
          state.visible = entry.intersectionRatio > 0.05;
          update();
        },
        { rootMargin: "300px 0px", threshold: [0, 0.05] },
      );
      io.observe(wrap);
      wrap._loop = { update, setPaused(p) { p ? wrap.setAttribute("data-paused", "") : wrap.removeAttribute("data-paused"); update(); } };
    });
  }

  /* -------------------------------------------------------------- Header */

  function initHeader() {
    const header = $("[data-header]");
    const toggle = $("[data-menu-toggle]");
    const menu = $("[data-mobile-menu]");
    let menuOpen = false;

    const setBorder = () => {
      if (!header) return;
      const on = window.scrollY > 8 || menuOpen;
      if (on) swap(header, "border-transparent", "border-ink/10");
      else swap(header, "border-ink/10", "border-transparent");
    };
    setBorder();
    window.addEventListener("scroll", setBorder, { passive: true });

    if (!toggle || !menu) return;
    const setMenu = (open) => {
      if (open === menuOpen) return;
      menuOpen = open;
      if (open) {
        menu.style.top = `${Math.max(0, header.getBoundingClientRect().bottom)}px`;
        swap(menu, "pointer-events-none -translate-y-2 opacity-0", "translate-y-0 opacity-100");
        menu.removeAttribute("inert");
        menu.setAttribute("aria-hidden", "false");
      } else {
        swap(menu, "translate-y-0 opacity-100", "pointer-events-none -translate-y-2 opacity-0");
        menu.setAttribute("inert", "");
        menu.setAttribute("aria-hidden", "true");
      }
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      $("[data-menu-icon-open]", toggle).hidden = open;
      $("[data-menu-icon-close]", toggle).hidden = !open;
      lockScroll(open);
      setBorder();
    };
    toggle.addEventListener("click", () => setMenu(!menuOpen));
    window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => e.matches && setMenu(false));
  }

  /* -------------------------------------------------------------- Search */

  function initSearch() {
    const dialog = $("[data-search]");
    if (!dialog) return;
    const input = $("[data-search-input]", dialog);
    const items = $$("[data-search-item]", dialog);
    const count = $("[data-search-count]", dialog);
    const empty = $("[data-search-empty]", dialog);
    const queryEcho = $("[data-search-query]", dialog);

    const filter = () => {
      const q = input.value.trim().toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      let shown = 0;
      items.forEach((li) => {
        const match = words.every((w) => li.dataset.text.includes(w));
        li.hidden = !match;
        if (match) shown++;
      });
      count.textContent = q ? `${shown} ${shown === 1 ? "result" : "results"}` : count.dataset.default;
      empty.hidden = !(q && shown === 0);
      queryEcho.textContent = input.value.trim();
    };
    const open = () => {
      if (dialog.open) return;
      dialog.showModal();
      lockScroll(true);
      input.focus();
    };
    const close = () => dialog.open && dialog.close();

    $$("[data-search-open]").forEach((b) => b.addEventListener("click", open));
    $("[data-search-close]", dialog).addEventListener("click", close);
    dialog.addEventListener("click", (e) => e.target === dialog && close());
    dialog.addEventListener("close", () => {
      lockScroll(false);
      input.value = "";
      filter();
    });
    input.addEventListener("input", filter);
    $("[data-search-form]", dialog).addEventListener("submit", (e) => {
      const first = items.find((li) => !li.hidden);
      if (first && input.value.trim()) {
        e.preventDefault();
        window.location.href = $("a", first).href;
      }
    });
  }

  /* ---------------------------------------------------------------- Cart */

  const cart = {
    drawer: null,
    opener: null,
    isOpen: false,

    init() {
      this.drawer = $("[data-cart-drawer]");
      const onCartPage = !!$("[data-cart-page]");
      $$("[data-cart-open]").forEach((el) =>
        el.addEventListener("click", (e) => {
          if (onCartPage || !this.drawer) return;
          e.preventDefault();
          this.open();
        }),
      );
      if (this.drawer) {
        this.drawer.addEventListener("click", (e) => {
          if (e.target.closest("[data-cart-overlay]") || e.target.closest("[data-cart-close]")) this.close();
        });
        window.addEventListener("keydown", (e) => this.onKey(e));
      }
      document.addEventListener("click", (e) => this.onLineClick(e));
    },

    open() {
      if (!this.drawer || this.isOpen) return;
      this.isOpen = true;
      this.opener = document.activeElement;
      const panel = $("[data-cart-panel]", this.drawer);
      swap(this.drawer, "pointer-events-none", "");
      this.drawer.removeAttribute("inert");
      this.drawer.setAttribute("aria-hidden", "false");
      swap($("[data-cart-overlay]", this.drawer), "opacity-0", "opacity-100");
      swap(panel, "translate-x-full", "translate-x-0");
      lockScroll(true);
      panel.focus();
    },

    close() {
      if (!this.drawer || !this.isOpen) return;
      this.isOpen = false;
      const panel = $("[data-cart-panel]", this.drawer);
      swap(this.drawer, "", "pointer-events-none");
      this.drawer.setAttribute("inert", "");
      this.drawer.setAttribute("aria-hidden", "true");
      swap($("[data-cart-overlay]", this.drawer), "opacity-100", "opacity-0");
      swap(panel, "translate-x-0", "translate-x-full");
      lockScroll(false);
      if (this.opener instanceof HTMLElement) this.opener.focus();
    },

    onKey(e) {
      if (!this.isOpen) return;
      if (e.key === "Escape") return this.close();
      if (e.key !== "Tab") return;
      const panel = $("[data-cart-panel]", this.drawer);
      const focusable = $$('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', panel);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },

    sectionIds() {
      const ids = [];
      if (this.drawer) ids.push(this.drawer.closest(".shopify-section")?.id.replace("shopify-section-", "") || "cart-drawer");
      const page = $("[data-cart-page]");
      if (page) ids.push(page.closest(".shopify-section").id.replace("shopify-section-", ""));
      return ids;
    },

    render(sections) {
      if (!sections) return;
      const parser = new DOMParser();
      this.sectionIds().forEach((id) => {
        const html = sections[id];
        if (!html) return;
        const doc = parser.parseFromString(html, "text/html");
        if (this.drawer && this.drawer.closest(".shopify-section")?.id === `shopify-section-${id}`) {
          const fresh = $("[data-cart-contents]", doc);
          const current = $("[data-cart-contents]", this.drawer);
          if (fresh && current) current.replaceWith(fresh);
        } else {
          const fresh = $("[data-cart-page]", doc);
          const current = $("[data-cart-page]");
          if (fresh && current) current.replaceWith(fresh);
        }
      });
      const contents = this.drawer && $("[data-cart-contents]", this.drawer);
      if (contents) this.setCount(Number(contents.dataset.count || 0));
    },

    setCount(count) {
      $$("[data-cart-count]").forEach((el) => {
        el.textContent = count;
        el.hidden = count === 0;
      });
      $$("[data-cart-open]").forEach((el) => el.setAttribute("aria-label", `Cart, ${count} ${count === 1 ? "item" : "items"}`));
    },

    async request(url, body) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...body, sections: this.sectionIds().join(","), sections_url: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.description || json.message || "That didn’t go through. Try again in a moment.");
      return json;
    },

    async add(variantId, quantity = 1) {
      const json = await this.request(`${routes.cartAdd}.js`, { items: [{ id: Number(variantId), quantity }] });
      this.render(json.sections);
      const line = this.drawer && $(`[data-variant-id="${variantId}"]`, this.drawer);
      const note = line && $("[data-added-note]", line);
      if (note) note.hidden = false;
      if (this.drawer) this.open();
      else window.location.href = routes.cart;
      document.dispatchEvent(new CustomEvent("cart:updated"));
      return json;
    },

    async change(lineKey, quantity) {
      const json = await this.request(`${routes.cartChange}.js`, { id: lineKey, quantity });
      this.render(json.sections);
      this.setCount(json.item_count ?? 0);
      return json;
    },

    onLineClick(e) {
      const btn = e.target.closest("[data-line-minus], [data-line-plus], [data-line-remove]");
      if (!btn) return;
      const line = btn.closest("[data-line]");
      if (!line) return;
      const qty = Number(line.dataset.quantity);
      let next = qty;
      if (btn.hasAttribute("data-line-minus")) next = qty - 1;
      if (btn.hasAttribute("data-line-plus")) next = Math.min(Number(line.dataset.max || 10), qty + 1);
      if (btn.hasAttribute("data-line-remove")) next = 0;
      line.style.opacity = "0.5";
      this.change(line.dataset.line, next).catch((err) => {
        line.style.opacity = "";
        window.alert(err.message);
      });
    },
  };

  /* -------------------------------------------------------- Product cards */

  function initProductCards(root = document) {
    $$("[data-product-card]", root).forEach((card) => {
      if (card._card) return;
      card._card = true;
      const video = $("[data-card-video]", card);
      const turn = $("[data-card-turn]", card);
      let playing = false;

      const setPlaying = (on) => {
        playing = on;
        if (turn) {
          turn.textContent = on ? "Stop" : "Turn";
          turn.setAttribute("aria-pressed", String(on));
        }
        if (!video) return;
        if (on) {
          if (reducedMotion()) return;
          if (!video.getAttribute("src")) video.src = video.dataset.src;
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
          swap(video, "opacity-100", "opacity-0");
        }
      };
      if (video) {
        video.addEventListener("playing", () => playing && swap(video, "opacity-0", "opacity-100"));
        card.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && setPlaying(true));
        card.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && setPlaying(false));
      }
      if (turn) turn.addEventListener("click", () => setPlaying(!playing));

      const panel = $("[data-quick-panel]", card);
      const toggle = $("[data-quick-toggle]", card);
      const setQuick = (open) => {
        if (!panel) return;
        if (open) swap(panel, "pointer-events-none translate-y-3 opacity-0", "translate-y-0 opacity-100");
        else swap(panel, "translate-y-0 opacity-100", "pointer-events-none translate-y-3 opacity-0");
        if (toggle) {
          toggle.textContent = open ? "Close" : "Quick add";
          toggle.setAttribute("aria-expanded", String(open));
        }
      };
      if (toggle) toggle.addEventListener("click", () => setQuick(toggle.getAttribute("aria-expanded") !== "true"));
      $$("[data-quick-add]", card).forEach((btn) =>
        btn.addEventListener("click", async () => {
          btn.disabled = true;
          try {
            await cart.add(btn.dataset.quickAdd, 1);
            setQuick(false);
          } catch (err) {
            window.alert(err.message);
          } finally {
            btn.disabled = false;
          }
        }),
      );
    });
  }

  /* ------------------------------------------------------ Product gallery */

  function initGalleries(root = document) {
    $$("[data-gallery]", root).forEach((gallery) => {
      if (gallery._gallery) return;
      gallery._gallery = true;
      const track = $("[data-gallery-track]", gallery);
      const slides = $$("[data-slide]", track);
      const thumbs = $$("[data-gallery-thumb]", gallery);
      const label = $("[data-gallery-label]", gallery);
      const name = gallery.dataset.name;
      let index = 0;

      const setActive = (i) => {
        index = i;
        thumbs.forEach((t, n) => {
          const on = n === i;
          if (on) t.setAttribute("aria-current", "true");
          else t.removeAttribute("aria-current");
          if (on) swap(t, "opacity-60 hover:opacity-100", "");
          else swap(t, "", "opacity-60 hover:opacity-100");
          const frame = t.firstElementChild;
          if (on) swap(frame, "ring-transparent", "ring-ink");
          else swap(frame, "ring-ink", "ring-transparent");
        });
        slides.forEach((s, n) => {
          const loop = $("[data-loop-video]", s);
          if (loop && loop._loop) loop._loop.setPaused(n !== i);
          else if (loop) n !== i ? loop.setAttribute("data-paused", "") : loop.removeAttribute("data-paused");
        });
        const slide = slides[i];
        if (label && slide) label.textContent = slide.dataset.label || `${i + 1} / ${slides.length}`;
        track.setAttribute("aria-label", `${name} images, ${i + 1} of ${slides.length}: ${slide ? slide.dataset.label : ""}`);
      };

      const go = (i) => {
        if (!slides.length) return;
        const next = (i + slides.length) % slides.length;
        track.scrollTo({ left: next * track.clientWidth, behavior: reducedMotion() ? "auto" : "smooth" });
        setActive(next);
      };

      let frame = 0;
      track.addEventListener(
        "scroll",
        () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const i = Math.round(track.scrollLeft / track.clientWidth);
            if (i !== index) setActive(i);
          });
        },
        { passive: true },
      );
      thumbs.forEach((t) => t.addEventListener("click", () => go(Number(t.dataset.galleryThumb))));
      $("[data-gallery-prev]", gallery)?.addEventListener("click", () => go(index - 1));
      $("[data-gallery-next]", gallery)?.addEventListener("click", () => go(index + 1));
      track.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        } else if (e.key === "Enter") {
          openViewer(slides, index, name, (last) => go(last));
        }
      });

      slides.forEach((slide, i) => {
        slide.addEventListener("click", () => openViewer(slides, i, name, (last) => go(last)));
        if (!slide.hasAttribute("data-zoom")) return;
        const img = $("img", slide);
        slide.addEventListener("pointermove", (e) => {
          if (e.pointerType !== "mouse" || !img) return;
          const r = slide.getBoundingClientRect();
          img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
          img.style.transform = "scale(2)";
        });
        slide.addEventListener("pointerleave", () => {
          if (!img) return;
          img.style.transform = "";
          img.style.transformOrigin = "";
        });
      });

      setActive(0);
      // Play the first slide's video once its loop controller exists.
      requestAnimationFrame(() => setActive(index));
    });
  }

  /** Full-screen viewer with tap-to-zoom, drag-to-pan, pinch and swipe. */
  function openViewer(slides, start, name, onClose) {
    const items = slides.map((s) => ({ src: s.dataset.full, video: s.dataset.video, alt: s.dataset.alt || "", label: s.dataset.label || "" }));
    let i = start;
    let scale = 1;
    let pan = { x: 0, y: 0 };
    const pointers = new Map();
    let gesture = null;

    const dialog = document.createElement("dialog");
    dialog.setAttribute("data-lenis-prevent", "");
    dialog.className = "m-0 h-[100dvh] max-h-none w-screen max-w-none bg-studio p-0 text-ink backdrop:bg-ink/60";
    dialog.innerHTML = `
      <div class="flex h-full flex-col">
        <div class="gutter flex h-16 shrink-0 items-center justify-between text-[0.9375rem]">
          <p class="text-charcoal"><span data-v-label></span> <span class="tabular-nums text-ash" data-v-count></span></p>
          <button type="button" class="link-underline py-2" data-v-close>Close</button>
        </div>
        <div class="relative min-h-0 flex-1 touch-none select-none overflow-hidden" data-v-stage>
          <div class="absolute inset-0 cursor-zoom-in transition-transform duration-200 ease-out motion-reduce:transition-none" data-v-layer></div>
        </div>
        <div class="gutter flex min-h-20 shrink-0 items-center justify-between gap-4 pb-[env(safe-area-inset-bottom,0px)] text-[0.9375rem]">
          <button type="button" class="button min-h-11 px-5" data-v-prev>Previous</button>
          <p class="hidden text-center text-ash sm:block" data-v-hint></p>
          <button type="button" class="button min-h-11 px-5" data-v-next>Next</button>
        </div>
      </div>`;
    document.body.appendChild(dialog);
    const layer = $("[data-v-layer]", dialog);
    const stage = $("[data-v-stage]", dialog);

    const apply = () => {
      layer.style.transform = `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`;
      if (scale > 1) swap(layer, "cursor-zoom-in", "cursor-grab active:cursor-grabbing");
      else swap(layer, "cursor-grab active:cursor-grabbing", "cursor-zoom-in");
      $("[data-v-hint]", dialog).textContent =
        scale > 1 ? "Drag to look around. Click to zoom out." : "Click or pinch to zoom. Swipe or use the arrow keys to change image.";
    };
    const reset = () => {
      scale = 1;
      pan = { x: 0, y: 0 };
      apply();
    };
    const show = () => {
      const item = items[i];
      layer.innerHTML = item.video
        ? `<video src="${item.video}" poster="${item.src}" autoplay muted loop playsinline class="absolute inset-0 h-full w-full object-contain p-4"></video>`
        : `<img src="${item.src}" alt="" class="absolute inset-0 h-full w-full object-contain p-4" draggable="false">`;
      const img = $("img", layer);
      if (img) img.alt = item.alt;
      $("[data-v-label]", dialog).textContent = item.label;
      $("[data-v-count]", dialog).textContent = `${i + 1} / ${items.length}`;
      dialog.setAttribute("aria-label", `${name}: ${item.label || `image ${i + 1}`}, ${i + 1} of ${items.length}`);
      reset();
    };
    const go = (d) => {
      i = (i + d + items.length) % items.length;
      show();
    };
    const distance = () => {
      const [a, b] = [...pointers.values()];
      return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
    };
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    stage.addEventListener("pointerdown", (e) => {
      stage.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      gesture = { startX: e.clientX, startY: e.clientY, pan: { ...pan }, dist: distance(), scale, moved: false };
    });
    stage.addEventListener("pointermove", (e) => {
      if (!pointers.has(e.pointerId) || !gesture) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && gesture.dist > 0) {
        gesture.moved = true;
        scale = Math.min(4, Math.max(1, (gesture.scale * distance()) / gesture.dist));
        return apply();
      }
      const dx = e.clientX - gesture.startX;
      const dy = e.clientY - gesture.startY;
      if (Math.abs(dx) + Math.abs(dy) > 6) gesture.moved = true;
      if (scale > 1) {
        pan = { x: gesture.pan.x + dx / scale, y: gesture.pan.y + dy / scale };
        apply();
      }
    });
    stage.addEventListener("pointerup", (e) => {
      const g = gesture;
      pointers.delete(e.pointerId);
      if (!g || pointers.size > 0) return;
      const dx = e.clientX - g.startX;
      if (!g.moved) {
        if (scale > 1) reset();
        else {
          const r = stage.getBoundingClientRect();
          scale = 2.5;
          pan = { x: ((r.width / 2 - (e.clientX - r.left)) / 2.5) * 1.5, y: ((r.height / 2 - (e.clientY - r.top)) / 2.5) * 1.5 };
          apply();
        }
      } else if (scale === 1 && Math.abs(dx) > 60) {
        go(dx < 0 ? 1 : -1);
      } else if (scale <= 1.02) {
        reset();
      }
      gesture = null;
    });
    stage.addEventListener("pointercancel", (e) => pointers.delete(e.pointerId));

    $("[data-v-prev]", dialog).addEventListener("click", () => go(-1));
    $("[data-v-next]", dialog).addEventListener("click", () => go(1));
    $("[data-v-close]", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      dialog.remove();
      onClose(i);
    });
    window.addEventListener("keydown", onKey);
    show();
    dialog.showModal();
    lockScroll(true);
    $("[data-v-close]", dialog).focus();
  }

  /* --------------------------------------------------------- Size finder */

  function initSizeCharts(root = document) {
    $$("[data-size-chart]", root).forEach((chart) => {
      if (chart._chart) return;
      chart._chart = true;
      const sizes = $$("[data-usual]", chart).map((b) => b.dataset.usual);
      const shifts = { fitted: Number(chart.dataset.fitted || 0), regular: 0, relaxed: Number(chart.dataset.relaxed || 0) };
      let usual = null;
      let fit = "regular";

      const pressed = (btn, on) => {
        btn.setAttribute("aria-pressed", String(on));
        if (on) swap(btn, "border-ink/20 bg-bone hover:border-ink", "border-ink bg-ink text-bone");
        else swap(btn, "border-ink bg-ink text-bone", "border-ink/20 bg-bone hover:border-ink");
      };
      const render = () => {
        $$("[data-usual]", chart).forEach((b) => pressed(b, b.dataset.usual === usual));
        $$("[data-fit]", chart).forEach((b) => pressed(b, b.dataset.fit === fit));
        const empty = $("[data-rec-empty]", chart);
        const result = $("[data-rec-result]", chart);
        $$("[data-row]", chart).forEach((r) => r.classList.remove("bg-plaster"));
        if (!usual) {
          empty.hidden = false;
          result.hidden = true;
          return;
        }
        const i = Math.min(sizes.length - 1, Math.max(0, sizes.indexOf(usual) + shifts[fit]));
        const rec = sizes[i];
        const row = $(`[data-row="${CSS.escape(rec)}"]`, chart);
        if (row) row.classList.add("bg-plaster");
        $("[data-rec-size]", chart).textContent = rec;
        $("[data-rec-detail]", chart).textContent = row ? `${row.dataset.chest}″ chest, ${row.dataset.length}″ long` : "";
        const pick = $("[data-rec-pick]", chart);
        if (pick) {
          pick.textContent = `Select ${rec}`;
          pick.dataset.size = rec;
        }
        empty.hidden = true;
        result.hidden = false;
      };
      $$("[data-usual]", chart).forEach((b) =>
        b.addEventListener("click", () => {
          usual = b.dataset.usual;
          render();
        }),
      );
      $$("[data-fit]", chart).forEach((b) =>
        b.addEventListener("click", () => {
          fit = b.dataset.fit;
          render();
        }),
      );
      $("[data-rec-pick]", chart)?.addEventListener("click", (e) => {
        chart.dispatchEvent(new CustomEvent("size:pick", { bubbles: true, detail: { size: e.currentTarget.dataset.size } }));
      });
    });
  }

  /* -------------------------------------------------------- Product form */

  function initProductForms(root = document) {
    $$("[data-product-form]", root).forEach((wrap) => {
      if (wrap._form) return;
      wrap._form = true;
      const form = document.getElementById(wrap.dataset.formId);
      const variants = JSON.parse($("[data-variants]", wrap).textContent);
      const sizeIndex = Number(wrap.dataset.sizeIndex);
      const fieldsets = $$("[data-option]", wrap);
      const idInput = $("[data-variant-input]", wrap);
      const addBtn = $("[data-add]", wrap);
      const addError = $("[data-add-error]", wrap);
      const sizeError = $("[data-size-error]", wrap);
      const qtyEl = $("[data-qty]", wrap);
      const qtyInput = $("[data-qty-input]", wrap);
      const minus = $("[data-qty-minus]", wrap);
      const plus = $("[data-qty-plus]", wrap);
      const product = wrap.closest("[data-product]");
      const priceEl = product && $("[data-price]", product);
      const comparePriceEl = product && $("[data-compare-price]", product);
      const soldOut = !variants.some((v) => v.available);
      let quantity = 1;

      // selected[i] is the chosen value of Shopify option i (fieldsets can be in a different order).
      const optionCount = variants[0] ? variants[0].options.length : 0;
      const selected = new Array(optionCount).fill(null);
      fieldsets.forEach((fs) => {
        const checked = $("input:checked", fs);
        selected[Number(fs.dataset.option)] = checked ? checked.value : null;
      });
      // Options with no picker on the page (a product with a single variant, whose only option
      // is Shopify's "Title: Default Title") take their value from the variant the page loaded with.
      const initial = variants.find((v) => idInput && String(v.id) === idInput.value) || variants[0];
      const shownOptions = new Set(fieldsets.map((fs) => Number(fs.dataset.option)));
      for (let i = 0; i < optionCount; i++) if (!shownOptions.has(i) && initial) selected[i] = initial.options[i];

      const matches = (v, sel) => sel.every((val, n) => val === null || v.options[n] === val);
      const current = () => (selected.every((v) => v !== null) ? variants.find((v) => matches(v, selected)) : null);
      const fallback = () => variants.find((v) => matches(v, selected) && v.available) || variants.find((v) => matches(v, selected)) || variants[0];

      const sizeLabel = () => (sizeIndex >= 0 ? selected[sizeIndex] : null);
      const colorLabel = () => {
        const fs = fieldsets.find((f) => f.hasAttribute("data-color-option"));
        return fs ? selected[Number(fs.dataset.option)] : null;
      };

      const update = () => {
        // Availability of each value given the other selections.
        fieldsets.forEach((fs) => {
          const n = Number(fs.dataset.option);
          $$("input[type=radio]", fs).forEach((input) => {
            const trial = selected.slice();
            trial[n] = input.value;
            const ok = variants.some((v) => matches(v, trial) && v.available);
            if (!fs.hasAttribute("data-color-option")) input.disabled = !ok;
            const label = input.parentElement.querySelector("[data-sold-out-label]");
            if (label) label.hidden = ok;
          });
          const value = $("[data-option-value]", fs);
          const labelWrap = $("[data-option-label]", fs);
          if (value) value.textContent = selected[n] || "";
          if (labelWrap) labelWrap.hidden = !selected[n];
        });

        const variant = current();
        const shown = variant || fallback();
        if (idInput && shown) idInput.value = shown.id;
        const max = variant ? variant.max : 10;
        quantity = Math.max(1, Math.min(quantity, max || 1));
        if (qtyEl) qtyEl.textContent = quantity;
        if (qtyInput) qtyInput.value = quantity;
        if (minus) minus.disabled = quantity <= 1;
        if (plus) plus.disabled = quantity >= max;
        if (priceEl && shown) priceEl.textContent = formatMoney(shown.price);
        if (comparePriceEl && shown) {
          comparePriceEl.hidden = !(shown.compare > shown.price);
          comparePriceEl.textContent = formatMoney(shown.compare);
        }
        if (addBtn) {
          const unavailable = variant && !variant.available;
          addBtn.disabled = soldOut || unavailable;
          addBtn.textContent = soldOut || unavailable ? "Sold out" : `Add to cart, ${formatMoney((shown ? shown.price : 0) * quantity)}`;
        }

        const size = sizeLabel();
        const status = $("[data-sticky-status]", wrap);
        if (status && config.storeOpen) {
          const color = colorLabel();
          status.textContent = size ? `${color ? `${color}, ` : ""}size ${size}` : sizeIndex >= 0 ? "No size selected" : color || "";
        }
        const notifySize = $("[data-notify-size]", wrap);
        if (notifySize) notifySize.textContent = size ? `size ${size}` : "it";
        const tags = $("[data-notify] [data-tags]", wrap);
        if (tags) tags.value = `newsletter,notify:${wrap.dataset.handle}${size ? `:${size}` : ""}`;

      };

      fieldsets.forEach((fs) => {
        const n = Number(fs.dataset.option);
        fs.addEventListener("change", (e) => {
          if (e.target.type !== "radio") return;
          selected[n] = e.target.value;
          // A new colour keeps the chosen size only if that combination is in stock.
          if (n !== sizeIndex && sizeIndex >= 0 && selected[sizeIndex] !== null) {
            const stillOk = variants.some((v) => matches(v, selected) && v.available);
            const sizeFs = fieldsets.find((f) => Number(f.dataset.option) === sizeIndex);
            if (!stillOk && sizeFs) {
              selected[sizeIndex] = null;
              $$("input", sizeFs).forEach((i) => (i.checked = false));
            }
          }
          if (sizeError && Number(fs.dataset.option) === sizeIndex) sizeError.hidden = true;
          update();
        });
      });

      minus?.addEventListener("click", () => {
        quantity = Math.max(1, quantity - 1);
        update();
      });
      plus?.addEventListener("click", () => {
        const v = current();
        quantity = Math.min(v ? v.max : 10, quantity + 1);
        update();
      });

      const onAdd = async (e) => {
        if (e) e.preventDefault();
        const variant = current();
        if (!variant || !variant.available) {
          if (sizeError && sizeIndex >= 0 && selected[sizeIndex] === null) {
            sizeError.hidden = false;
            scrollToEl(document.getElementById("size-options"));
          } else if (addError) {
            addError.textContent = variant ? "This option is sold out." : "Choose an option to add this to your cart.";
            addError.hidden = false;
          }
          return;
        }
        if (addError) addError.hidden = true;
        const label = addBtn ? addBtn.textContent : "";
        if (addBtn) {
          addBtn.disabled = true;
          addBtn.textContent = "Adding";
        }
        try {
          await cart.add(variant.id, quantity);
          quantity = 1;
        } catch (err) {
          if (addError) {
            addError.textContent = err.message;
            addError.hidden = false;
          }
        } finally {
          if (addBtn) addBtn.textContent = label;
          update();
        }
      };
      form?.addEventListener("submit", onAdd);
      $("[data-sticky-add]", wrap)?.addEventListener("click", () => onAdd());

      // Mobile: keep add to cart reachable once the main button scrolls away.
      const cta = $("[data-cta]", wrap);
      const bar = $("[data-sticky-bar]", wrap);
      if (cta && bar) {
        const io = new IntersectionObserver(([entry]) => {
          const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          if (show) swap(bar, "translate-y-full", "translate-y-0");
          else swap(bar, "translate-y-0", "translate-y-full");
          bar.setAttribute("aria-hidden", String(!show));
          show ? bar.removeAttribute("inert") : bar.setAttribute("inert", "");
        });
        io.observe(cta);
      }

      // Size guide dialog; "Select M" in the finder picks the size.
      const guide = $("[data-size-guide]", wrap);
      if (guide) {
        $("[data-size-guide-open]", wrap)?.addEventListener("click", () => {
          guide.showModal();
          lockScroll(true);
        });
        $("[data-size-guide-close]", guide).addEventListener("click", () => guide.close());
        guide.addEventListener("click", (e) => e.target === guide && guide.close());
        guide.addEventListener("close", () => lockScroll(false));
        guide.addEventListener("size:pick", (e) => {
          const sizeFs = fieldsets.find((f) => Number(f.dataset.option) === sizeIndex);
          const input = sizeFs && $$("input", sizeFs).find((i) => i.value === e.detail.size);
          if (input && !input.disabled) {
            input.checked = true;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
          guide.close();
        });
      }

      update();
    });
  }

  /* ---------------------------------------------------------------- Film */

  function initFilm() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-film-open]");
      if (!btn) return;
      const wide = window.matchMedia("(min-width: 768px) and (min-aspect-ratio: 1/1)").matches;
      const src = wide ? btn.dataset.wide : btn.dataset.vertical;
      const poster = wide ? btn.dataset.widePoster : btn.dataset.verticalPoster;
      const dialog = document.createElement("dialog");
      dialog.setAttribute("aria-label", `${btn.dataset.title}, a Swolvation film`);
      dialog.setAttribute("data-lenis-prevent", "");
      dialog.className = "m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/95";
      dialog.innerHTML = `
        <div class="relative">
          <video src="${src}" poster="${poster}" autoplay controls playsinline class="${wide ? "max-h-[85dvh] w-[min(90vw,150dvh)]" : "max-h-[88dvh] w-[min(92vw,49dvh)]"}"></video>
          <button type="button" data-film-close class="absolute -top-12 right-0 min-h-11 px-2 text-[0.9375rem] text-bone underline underline-offset-4">Close</button>
        </div>`;
      document.body.appendChild(dialog);
      dialog.addEventListener("click", (ev) => (ev.target === dialog || ev.target.closest("[data-film-close]")) && dialog.close());
      dialog.addEventListener("close", () => {
        lockScroll(false);
        dialog.remove();
      });
      dialog.showModal();
      lockScroll(true);
      $("[data-film-close]", dialog).focus();
    });
  }

  /* ---------------------------------------------------- Newsletter forms */

  const SUBSCRIBED_KEY = "swolvation.subscribed";

  function initNewsletters(root = document) {
    $$("[data-newsletter] form", root).forEach((form) => {
      if (form._newsletter) return;
      form._newsletter = true;
      const wrap = form.closest("[data-newsletter]");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        const note = $("[data-note]", form);
        const button = $('button[type="submit"]', form);
        const showError = (message) => {
          note.textContent = message;
          note.className = `mt-3 min-h-5 text-xs ${note.dataset.errorClass}`;
          email.setAttribute("aria-invalid", "true");
        };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return showError("Enter a valid email address.");
        email.removeAttribute("aria-invalid");
        button.disabled = true;
        button.textContent = "Joining";
        try {
          const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "text/html" } });
          if (res.url.includes("/challenge")) {
            // Shopify asked for a captcha: hand over to the normal form post.
            HTMLFormElement.prototype.submit.call(form);
            return;
          }
          const doc = new DOMParser().parseFromString(await res.text(), "text/html");
          const echoed = doc.getElementById(form.id);
          const status = echoed && $("[data-status]", echoed);
          if (status && status.dataset.status === "error") {
            const msg = $("[data-note]", echoed);
            throw new Error(msg ? msg.textContent.trim() : "That didn’t go through.");
          }
          const fields = $("[data-fields]", form);
          if (fields) fields.hidden = true;
          if (note) note.hidden = true;
          const done = $("[data-done]", form);
          if (done) done.hidden = false;
          store.set(SUBSCRIBED_KEY, "1");
          wrap.dispatchEvent(new CustomEvent("newsletter:done", { bubbles: true }));
        } catch (err) {
          showError(err.message || "That didn’t go through.");
          button.disabled = false;
          button.textContent = button.dataset.cta;
        }
      });
    });
  }

  /* --------------------------------------------------------- Email popup */

  function initPopup() {
    const dialog = $("[data-popup]");
    if (!dialog) return;
    const DISMISS_KEY = "swolvation.popup.dismissed";
    const QUIET_DAYS = 14;
    const skip = ["/cart", "/checkout", "/pages/contact", "/account", "/password"];
    const path = window.location.pathname;
    if (skip.some((p) => path.startsWith(p)) || window.Shopify?.designMode) return;

    const shouldShow = () => {
      if (store.get(SUBSCRIBED_KEY)) return false;
      const dismissed = Number(store.get(DISMISS_KEY) || 0);
      return Date.now() - dismissed > QUIET_DAYS * 86400000;
    };
    if (!shouldShow()) return;

    let fired = false;
    const fire = () => {
      if (fired || !shouldShow() || document.querySelector("dialog[open]") || cart.isOpen) return;
      fired = true;
      window.removeEventListener("scroll", onScroll);
      dialog.showModal();
      dialog.focus();
      lockScroll(true);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.5) fire();
    };
    window.setTimeout(fire, Number(dialog.dataset.delay || 30) * 1000);
    // Product pages are where people read details and pick a size; don't interrupt that on scroll.
    if (!path.includes("/products/")) window.addEventListener("scroll", onScroll, { passive: true });

    const dismiss = () => {
      store.set(DISMISS_KEY, String(Date.now()));
      if (dialog.open) dialog.close();
    };
    dialog.addEventListener("close", () => {
      store.set(DISMISS_KEY, String(Date.now()));
      lockScroll(false);
    });
    dialog.addEventListener("click", (e) => e.target === dialog && dismiss());
    $("[data-popup-dismiss]", dialog).addEventListener("click", dismiss);
    dialog.addEventListener("newsletter:done", () => {
      ["[data-popup-title]", "[data-popup-text]", "[data-popup-dismiss]"].forEach((sel) => {
        const el = $(sel, dialog);
        if (el && el.dataset.doneText) el.textContent = el.dataset.doneText;
      });
    });
  }

  /* ---------------------------------------------------------- Shop filter */

  function initShopFilter(root = document) {
    const shop = $("[data-shop]", root);
    if (!shop || shop._filter) return;
    shop._filter = true;
    const buttons = $$("button[data-filter]", shop).filter((b) => b.closest("nav"));
    const items = $$("[data-category]", shop);
    const count = $("[data-filter-count]", shop);
    const empty = $("[data-filter-empty]", shop);
    const grid = $("[data-grid]", shop);

    const select = (value, push = true) => {
      let shown = 0;
      items.forEach((item) => {
        const match = !value || item.dataset.category === value;
        item.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach((b) => {
        const active = b.dataset.filter === value;
        b.setAttribute("aria-pressed", String(active));
        if (active) swap(b, "border-ink/15 hover:border-ink", "border-ink bg-ink text-bone");
        else swap(b, "border-ink bg-ink text-bone", "border-ink/15 hover:border-ink");
      });
      if (count) count.textContent = `${shown} ${shown === 1 ? "product" : "products"}`;
      if (empty) empty.hidden = shown > 0;
      if (grid) grid.hidden = shown === 0;
      if (push) {
        const url = new URL(window.location.href);
        value ? url.searchParams.set("category", value) : url.searchParams.delete("category");
        window.history.replaceState({}, "", url);
      }
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    };
    $$("[data-filter]", shop).forEach((b) => b.addEventListener("click", () => select(b.dataset.filter)));
    const initial = new URLSearchParams(window.location.search).get("category") || "";
    if (initial) select(initial, false);
  }

  /* -------------------------------------------------------------- Contact */

  function initContact() {
    const topic = $("[data-contact-topic]");
    const order = $("[data-contact-order]");
    if (!topic || !order) return;
    const sync = () => (order.hidden = !["An order", "Returns and exchanges"].includes(topic.value));
    topic.addEventListener("change", sync);
    sync();
    const form = topic.closest("form");
    form.addEventListener("submit", () => {
      const btn = $('button[type="submit"]', form);
      if (btn) btn.textContent = "Sending";
    });
  }

  /* ----------------------------------------------------------------- Boot */

  function initSection(root) {
    initLoopVideos(root);
    initProductCards(root);
    initGalleries(root);
    initSizeCharts(root);
    initProductForms(root);
    initNewsletters(root);
    initShopFilter(root);
    initMotion(root);
  }

  function boot() {
    initSmoothScroll();
    initHeader();
    initSearch();
    cart.init();
    initFilm();
    initPopup();
    initContact();
    initSection(document);
    // Fonts and late images change section heights; keep ScrollTrigger positions right.
    window.addEventListener("load", () => window.ScrollTrigger && window.ScrollTrigger.refresh());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // Theme editor: re-run behaviour for sections as they are added or changed.
  document.addEventListener("shopify:section:load", (e) => initSection(e.target));

  window.Swolvation = Object.assign(config, { cart, formatMoney });
})();
