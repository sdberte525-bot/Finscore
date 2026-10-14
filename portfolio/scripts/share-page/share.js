(() => {
  const header = document.getElementById("site-header");
  const menuButton = header.querySelector('[aria-controls="mobile-menu"]');
  const menuLabel = menuButton.querySelector("span");
  const panel = document.getElementById("mobile-menu");
  const navLinks = Array.from(header.querySelectorAll('nav a[href^="#"]'));

  // Header turns solid once the page scrolls.
  const onScroll = () => header.toggleAttribute("data-solid", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Highlight the section in view.
  const setActive = (hash) => {
    navLinks.forEach((a) => {
      if (a.getAttribute("href") === hash) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "top" ? null : "#" + e.target.id)),
      { rootMargin: "-30% 0px -65% 0px" },
    );
    new Set(navLinks.map((a) => a.getAttribute("href"))).forEach((h) => {
      const el = document.querySelector(h);
      if (el) observer.observe(el);
    });
    const hero = document.getElementById("top");
    if (hero) observer.observe(hero);
  }

  // Mobile menu: open and close, focus handling, scroll lock.
  let open = false;
  const focusables = () => [menuButton, ...panel.querySelectorAll("a, button:not([hidden])")];
  const setOpen = (next, returnFocus) => {
    open = next;
    panel.hidden = !open;
    header.toggleAttribute("data-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Close" : "Menu";
    document.body.style.overflow = open ? "hidden" : "";
    if (open) panel.querySelector("a")?.focus();
    else if (returnFocus) menuButton.focus();
  };
  menuButton.addEventListener("click", () => setOpen(!open, false));
  panel.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false, false);
  });
  header.querySelector('a[href="#top"]')?.addEventListener("click", () => open && setOpen(false, false));
  document.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") return setOpen(false, true);
    if (e.key !== "Tab") return;
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  window.matchMedia("(min-width: 64rem)").addEventListener("change", (m) => m.matches && open && setOpen(false, false));

  // Copy email address.
  document.querySelectorAll("button").forEach((btn) => {
    if (btn.textContent.trim() !== "Copy email address") return;
    const label = btn.querySelector("[aria-live]") || btn;
    let timer;
    btn.addEventListener("click", () => {
      const done = (text) => {
        label.textContent = text;
        clearTimeout(timer);
        timer = setTimeout(() => (label.textContent = "Copy email address"), 2400);
      };
      const email = "sdberte525@gmail.com";
      const fallback = () => {
        const link = btn.parentElement.querySelector('a[href^="mailto:"]');
        if (link) {
          const range = document.createRange();
          range.selectNodeContents(link);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
        done("Address selected. Press Ctrl+C or ⌘C to copy.");
      };
      try {
        navigator.clipboard.writeText(email).then(() => done("Email address copied"), fallback);
      } catch {
        fallback();
      }
    });
  });

  // Résumé: offered through the viewer's save dialog when this view supports it.
  const resumeButtons = document.querySelectorAll("button[data-resume]");
  const resumeRows = document.querySelectorAll("[data-resume-row]");
  const status = document.createElement("p");
  status.className = "resume-status mt-2 text-steel-light";
  status.setAttribute("aria-live", "polite");
  document.querySelector("#contact button[data-resume]")?.after(status);

  const ready = window.claude?.use ? window.claude.use("downloads") : Promise.resolve(null);
  ready.then((downloads) => {
    if (!downloads) return;
    resumeRows.forEach((el) => (el.hidden = false));
    resumeButtons.forEach((btn) => {
      btn.hidden = false;
      btn.addEventListener("click", async () => {
        status.textContent = "";
        try {
          const res = await fetch("salvatore-berte-resume.pdf");
          if (!res.ok) throw { code: "unavailable" };
          await downloads.save({ filename: "Salvatore-Berte-Resume.pdf", data: await res.blob() });
          status.textContent = "Résumé saved.";
        } catch (err) {
          if (err && err.code === "declined") return;
          if (err && err.code === "rate_limited") status.textContent = "A save prompt is already open.";
          else status.textContent = "The résumé couldn't be saved here. Email me and I'll send a copy.";
        }
      });
    });
  });
})();
