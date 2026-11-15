/**
 * DEBUHCO — scroll & entrance animations.
 * GSAP + ScrollTrigger, with a graceful fallback (IntersectionObserver)
 * and full respect for prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealAll() {
  document
    .querySelectorAll<HTMLElement>('[data-reveal]')
    .forEach((el) => el.classList.add('is-in'));
}

function animateCounters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    if (prefersReduced) {
      el.textContent = String(target);
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toString();
      },
    });
  });
}

function initReveal() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  items.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => el.classList.add('is-in'),
    });
  });
}

function initParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '40');
    gsap.to(el, {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('[data-hero-line] > span', {
    yPercent: 115,
    duration: 1,
    stagger: 0.08,
  })
    .from('[data-hero-sub]', { y: 24, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('[data-hero-cta]', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
    .from('[data-hero-art]', { opacity: 0, scale: 0.94, duration: 1.2 }, '-=1')
    .from('[data-hero-badge]', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.7');
}

function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    const inner = track.querySelector<HTMLElement>('[data-marquee-inner]');
    if (!inner) return;
    inner.innerHTML += inner.innerHTML; // duplicate for seamless loop
    gsap.to(inner, {
      xPercent: -50,
      repeat: -1,
      duration: 26,
      ease: 'none',
    });
  });
}

/** Magnetic buttons/links: gently pull toward the cursor (fine pointers only). */
function initMagnetic() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '0.35');
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
    };
    const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  });
}

/** Subtle 3D tilt on cards (fine pointers only). */
function initTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '6');
    el.style.transformStyle = 'preserve-3d';
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * max, rotateX: -py * max, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    };
    const reset = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  });
}

/** Hero: cycle the rotating keyword with a vertical slide. */
function initHeroRotator() {
  const rot = document.querySelector<HTMLElement>('[data-rotator]');
  if (!rot) return;
  const words = Array.from(rot.querySelectorAll<HTMLElement>('.hero__rot'));
  if (words.length < 2) return;
  let i = 0;
  setInterval(() => {
    const cur = words[i];
    i = (i + 1) % words.length;
    const next = words[i];
    cur.classList.remove('is-active');
    cur.classList.add('is-out');
    next.classList.remove('is-out');
    next.classList.add('is-active');
    window.setTimeout(() => cur.classList.remove('is-out'), 600);
  }, 2400);
}

/** Hero: cursor-following spotlight + subtle mouse parallax on the art. */
function initHeroInteractions() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || !window.matchMedia('(pointer: fine)').matches) return;
  const art = hero.querySelector<HTMLElement>('[data-hero-art]');
  const xTo = art ? gsap.quickTo(art, 'x', { duration: 0.6, ease: 'power3.out' }) : null;
  const yTo = art ? gsap.quickTo(art, 'y', { duration: 0.6, ease: 'power3.out' }) : null;
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    hero.style.setProperty('--mx', `${px * 100}%`);
    hero.style.setProperty('--my', `${py * 100}%`);
    if (xTo && yTo) {
      xTo((px - 0.5) * 38);
      yTo((py - 0.5) * 38);
    }
  });
  hero.addEventListener('mouseleave', () => {
    if (xTo && yTo) {
      xTo(0);
      yTo(0);
    }
  });
}

/** Hero: crossfading photo slideshow with synced indicators. */
function initHeroSlides() {
  const wrap = document.querySelector<HTMLElement>('[data-hero-slides]');
  if (!wrap) return;
  const slides = Array.from(wrap.querySelectorAll<HTMLElement>('.hero__slide'));
  const dots = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-dots] .hero__dotbtn'));
  if (slides.length < 2) return;
  let i = 0;
  window.setInterval(() => {
    slides[i].classList.remove('is-active');
    dots[i]?.classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
    dots[i]?.classList.add('is-active');
  }, 5000);
}

/** Hero background drifts slower than the page for depth. */
function initHeroParallax() {
  const slides = document.querySelector<HTMLElement>('[data-hero-slides]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!slides || !hero) return;
  gsap.to(slides, {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}

/** Thin progress bar that tracks page scroll. */
function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

/** Big headings that wipe up behind a mask when scrolled into view. */
function initHeadingWipe() {
  gsap.utils.toArray<HTMLElement>('[data-wipe]').forEach((el) => {
    gsap.from(el, {
      yPercent: 115,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

function boot() {
  initScrollProgress();

  if (prefersReduced) {
    revealAll();
    document
      .querySelectorAll<HTMLElement>('[data-count]')
      .forEach((el) => (el.textContent = el.dataset.count || '0'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  initHero();
  initHeroSlides();
  initHeroParallax();
  initReveal();
  initParallax();
  animateCounters();
  initMarquee();
  initMagnetic();
  initTilt();
  initHeadingWipe();
  initHeroRotator();
  initHeroInteractions();
  ScrollTrigger.refresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

// Re-run on Astro view transitions / client navigation.
document.addEventListener('astro:page-load', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  boot();
});
