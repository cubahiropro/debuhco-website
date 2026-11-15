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

function boot() {
  if (prefersReduced) {
    revealAll();
    document
      .querySelectorAll<HTMLElement>('[data-count]')
      .forEach((el) => (el.textContent = el.dataset.count || '0'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  initHero();
  initReveal();
  initParallax();
  animateCounters();
  initMarquee();
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
