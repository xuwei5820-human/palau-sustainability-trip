/* =========================================================
 * 動畫：Lenis 平滑滾動、GSAP SplitText / ScrollTrigger、Motion 淡入
 * 支援 prefers-reduced-motion：使用者偏好減少動態時，全部略過
 * ========================================================= */
(function () {
  "use strict";
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NAV = 52;

  const libsOk = window.gsap && window.ScrollTrigger && window.SplitText && window.Lenis && window.Motion;
  if (reduced || !libsOk) {
    root.classList.remove("js-motion");
    nativeAnchors();
    activeNav();
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ---------- Lenis ---------- */
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  window.__lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-scroll]");
    if (!a) return;
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: target.id === "hero" ? 0 : -NAV - 8, duration: 1.2 });
  });

  /* ---------- Hero：SplitText 逐行浮現 ---------- */
  document.fonts.ready.then(() => {
    SplitText.create("#hero-title", {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.set("#hero-title", { autoAlpha: 1 });
        return gsap.from(self.lines, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.14, delay: 0.1 });
      },
    });
  });

  /* ---------- 第二區：圖片 pin 住、放大、文字淡入 ---------- */
  gsap.set(".pin-line", { autoAlpha: 0, y: 40 });
  gsap.timeline({
    scrollTrigger: { trigger: ".pin-stage", start: "top top", end: "+=160%", scrub: 0.6, pin: true, anticipatePin: 1 },
  })
    .fromTo(".pin-frame", { scale: 0.5, borderRadius: 36 }, { scale: 1, borderRadius: 0, ease: "power2.inOut", duration: 1 })
    .fromTo(".pin-frame img", { scale: 1.25 }, { scale: 1, ease: "none", duration: 1 }, 0)
    .to(".pin-line", { autoAlpha: 1, y: 0, stagger: 0.18, duration: 0.5, ease: "power2.out" }, 0.65);

  /* ---------- 第三區：右側卡片依序滑入 ---------- */
  const mm = gsap.matchMedia();
  mm.add({ desktop: "(min-width: 901px)", mobile: "(max-width: 900px)" }, (ctx) => {
    const { desktop } = ctx.conditions;
    gsap.utils.toArray(".esg-card").forEach((card, i) => {
      gsap.from(card, {
        x: desktop ? 120 : 0,
        y: desktop ? 0 : 48,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        delay: desktop ? 0 : i * 0.05,
        scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
      });
    });
  });

  /* ---------- 其他元素：Motion 淡入上滑 ---------- */
  const { inView, animate } = Motion;
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    inView(el, () => {
      animate(el, { opacity: [0, 1], y: [32, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    }, { margin: "0px 0px -8% 0px" });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
  activeNav();

  /* ---------- helpers ---------- */
  function nativeAnchors() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-scroll]");
      if (!a) return;
      const t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView(); history.replaceState(null, "", a.getAttribute("href")); }
    });
  }
  function activeNav() {
    const map = new Map([...document.querySelectorAll(".nav-links a")].map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const a = map.get(en.target.id);
        if (a && en.isIntersecting) { map.forEach((x) => x.classList.remove("active")); a.classList.add("active"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
  }
})();
