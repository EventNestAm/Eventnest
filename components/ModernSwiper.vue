<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const { t } = useI18n();

import what1 from "@/assets/img/whatWhereWhen/what1.jpg";
import what2 from "@/assets/img/whatWhereWhen/what2.jpg";
import what3 from "@/assets/img/whatWhereWhen/what3.jpg";
import what4 from "@/assets/img/whatWhereWhen/what4.jpg";
import what5 from "@/assets/img/whatWhereWhen/what5.jpg";
import what6 from "@/assets/img/whatWhereWhen/what6.jpg";
import what7 from "@/assets/img/whatWhereWhen/what7.jpg";
import what8 from "@/assets/img/whatWhereWhen/what8.jpg";
import what9 from "@/assets/img/whatWhereWhen/what9.jpg";

import when1 from "@/assets/img/whatWhereWhen/when1.jpg";
import when2 from "@/assets/img/whatWhereWhen/when2.jpg";
import when3 from "@/assets/img/whatWhereWhen/when3.jpg";
import when4 from "@/assets/img/whatWhereWhen/when4.jpg";
import when5 from "@/assets/img/whatWhereWhen/when5.jpg";

import KarginHaxordum from "@/assets/img/KarginHaxordum/karginHaxordum.jpg";
import KarginHaxordum2 from "@/assets/img/KarginHaxordum/karginHaxordum2.jpg";
import KarginHaxordum3 from "@/assets/img/KarginHaxordum/karginHaxordum3.jpg";
import KarginHaxordum8 from "@/assets/img/KarginHaxordum/karginHaxordum8.jpg";
import KarginHaxordum9 from "@/assets/img/KarginHaxordum/karginHaxordum9.jpg";
import KarginHaxordum10 from "@/assets/img/KarginHaxordum/karginHaxordum10.jpg";
import KarginHaxordum11 from "@/assets/img/KarginHaxordum/karginHaxordum11.jpg";
import KarginHaxordum12 from "@/assets/img/KarginHaxordum/karginHaxordum12.jpg";
import KarginHaxordum13 from "@/assets/img/KarginHaxordum/karginHaxordum13.jpg";

const AUTOPLAY_MS = 3500;

const sections = [
  {
    tag: "QUIZ",
    title: "KARGIN_SKETCH",
    images: [
      { src: KarginHaxordum, title: "Kargin Haxordum" },
      { src: KarginHaxordum11, title: "Kargin Haxordum" },
      { src: KarginHaxordum2, title: "Kargin Haxordum" },
      { src: KarginHaxordum9, title: "Kargin Haxordum" },
      { src: KarginHaxordum13, title: "Kargin Haxordum" },
      { src: KarginHaxordum3, title: "Kargin Haxordum" },
      { src: KarginHaxordum8, title: "Kargin Haxordum" },
      { src: KarginHaxordum10, title: "Kargin Haxordum" },
      { src: KarginHaxordum12, title: "Kargin Haxordum" },
    ],
  },
  {
    tag: "GAMES",
    title: "MAFIA",
    images: [
      { src: what8, title: "Mafia" },
      { src: what7, title: "Mafia" },
      { src: what9, title: "Mafia" },
      { src: what2, title: "Mafia" },
      { src: what5, title: "Mafia" },
      { src: what3, title: "Mafia" },
      { src: what4, title: "Mafia" },
      { src: what1, title: "Mafia" },
      { src: what6, title: "Mafia" },
    ],
  },
  {
    tag: "QUIZ",
    title: "WHAT_WHERE_WHEN",
    images: [
      { src: when4, title: "What Where When" },
      { src: when1, title: "What Where When" },
      { src: when3, title: "What Where When" },
      { src: when2, title: "What Where When" },
      { src: when5, title: "What Where When" },
    ],
  },
];

const scrollers = [];
const active = ref(sections.map(() => 0));
const paused = sections.map(() => false);
const visible = sections.map(() => false);
const timers = [];
const frames = [];
let observer;
let reduceMotion = false;

const setScroller = (el, i) => {
  if (el) scrollers[i] = el;
};

function slideStep(el) {
  const first = el.firstElementChild;
  if (!first) return 0;
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  return first.getBoundingClientRect().width + gap;
}

function onScroll(i) {
  if (frames[i]) return;
  frames[i] = requestAnimationFrame(() => {
    frames[i] = 0;
    const el = scrollers[i];
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const idx = atEnd
      ? sections[i].images.length - 1
      : Math.round(el.scrollLeft / (slideStep(el) || 1));
    if (active.value[i] !== idx) active.value[i] = idx;
  });
}

function go(i, dir) {
  const el = scrollers[i];
  if (!el) return;
  const atStart = el.scrollLeft <= 4;
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
  const behavior = reduceMotion ? "auto" : "smooth";
  if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior });
  else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior });
  else el.scrollBy({ left: dir * slideStep(el), behavior });
}

function goTo(i, idx) {
  const el = scrollers[i];
  if (!el) return;
  el.scrollTo({
    left: idx * slideStep(el),
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        visible[scrollers.indexOf(e.target)] = e.isIntersecting;
      }
    },
    { threshold: 0.3 }
  );

  sections.forEach((_, i) => {
    if (scrollers[i]) observer.observe(scrollers[i]);
    if (!reduceMotion) {
      timers[i] = setInterval(() => {
        if (!paused[i] && visible[i] && !document.hidden) go(i, 1);
      }, AUTOPLAY_MS);
    }
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
  timers.forEach(clearInterval);
  frames.forEach((f) => f && cancelAnimationFrame(f));
});
</script>

<template>
  <div class="gallery space-y-16 sm:space-y-20">
    <section v-for="(section, i) in sections" :key="i">
      <p class="section-label">{{ t(section.tag) }}</p>
      <h2 class="section-title">{{ t(section.title) }}</h2>

      <div
        class="carousel"
        @pointerenter="paused[i] = true"
        @pointerleave="paused[i] = false"
        @focusin="paused[i] = true"
        @focusout="paused[i] = false"
        @touchstart.passive="paused[i] = true"
        @touchend.passive="paused[i] = false"
      >
        <ul
          :ref="(el) => setScroller(el, i)"
          class="track"
          @scroll.passive="onScroll(i)"
        >
          <li v-for="(slide, k) in section.images" :key="slide.src" class="slide">
            <div class="slide-inner">
              <img
                :src="slide.src"
                :alt="slide.title"
                :loading="i === 0 && k < 3 ? 'eager' : 'lazy'"
                :fetchpriority="i === 0 && k === 0 ? 'high' : 'auto'"
                decoding="async"
                draggable="false"
              />
              <span class="slide-tag font-mono">{{ slide.title }}</span>
            </div>
          </li>
        </ul>

        <button class="nav prev" aria-label="Previous" @click="go(i, -1)">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button class="nav next" aria-label="Next" @click="go(i, 1)">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      <div class="dots" role="tablist">
        <button
          v-for="(_, k) in section.images"
          :key="k"
          class="dot"
          :class="{ on: active[i] === k }"
          :aria-label="`Slide ${k + 1}`"
          :aria-selected="active[i] === k"
          @click="goTo(i, k)"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.font-mono { font-family: "JetBrains Mono", monospace; }

.section-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.35em;
  color: #7c5cfc;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 6px;
}

.section-title {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: #1c1530;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.carousel {
  position: relative;
  margin-top: 1.5rem;
}

/* Native scroll-snap: GPU-driven, zero JS in the scroll path */
.track {
  --per-view: 1.2;
  --gap: 14px;
  display: flex;
  gap: var(--gap);
  margin: 0;
  padding: 4px;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.track::-webkit-scrollbar { display: none; }

.slide {
  flex: 0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
  scroll-snap-align: start;
  content-visibility: auto;
  contain-intrinsic-size: auto 300px;
}

@media (min-width: 640px)  { .track { --per-view: 1.5; } }
@media (min-width: 768px)  { .track { --per-view: 2.2; --gap: 16px; } }
@media (min-width: 1024px) { .track { --per-view: 3;   --gap: 18px; } }

.slide-inner {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: #f0ecff;
  box-shadow: 0 8px 24px -10px rgba(20, 16, 43, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.slide-inner:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -12px rgba(124, 92, 252, 0.3);
}
.slide-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
}

.slide-tag {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 10px;
  letter-spacing: 0.12em;
  padding: 4px 10px;
  border-radius: 999px;
  backdrop-filter: blur(6px);
  text-transform: uppercase;
}

.nav {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  z-index: 2;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  color: #1c1530;
  border: 0.5px solid rgba(20, 16, 43, 0.12);
  box-shadow: 0 4px 12px -4px rgba(20, 16, 43, 0.2);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.nav:hover { background: #7c5cfc; color: #fff; }
.nav.prev { left: 8px; }
.nav.next { right: 8px; }
@media (hover: none) { .nav { display: none; } }

.dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
}
.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #c9bdf7;
  cursor: pointer;
  transition: width 0.25s ease, background 0.25s ease;
}
.dot.on { width: 22px; background: #7c5cfc; }
</style>