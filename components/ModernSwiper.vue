<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const { t } = useI18n();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

const modules = [Navigation, Pagination, Autoplay];

const sections = [
  {
    tag: "QUIZ",
    title: "KARGIN_SKETCH",
    images: [
      { src: KarginHaxordum,   title: "Kargin Haxordum" },
      { src: KarginHaxordum11, title: "Kargin Haxordum" },
      { src: KarginHaxordum2,  title: "Kargin Haxordum" },
      { src: KarginHaxordum9,  title: "Kargin Haxordum" },
      { src: KarginHaxordum13, title: "Kargin Haxordum" },
      { src: KarginHaxordum3,  title: "Kargin Haxordum" },
      { src: KarginHaxordum8,  title: "Kargin Haxordum" },
      { src: KarginHaxordum10, title: "Kargin Haxordum" },
      { src: KarginHaxordum12, title: "Kargin Haxordum" },
    ],
  },
  {
    tag: "GAMES",
    title: "MAFIA",
    images: [
      { src: what8, title: "What Where When" },
      { src: what7, title: "What Where When" },
      { src: what9, title: "What Where When" },
      { src: what2, title: "What Where When" },
      { src: what5, title: "What Where When" },
      { src: what3, title: "What Where When" },
      { src: what4, title: "What Where When" },
      { src: what1, title: "What Where When" },
      { src: what6, title: "What Where When" },
    ],
  },
  {
    tag: "QUIZ",
    title: "WHAT_WHERE_WHEN",
    images: [
      { src: when4, title: "When Where When" },
      { src: when1, title: "When Where When" },
      { src: when3, title: "When Where When" },
      { src: when2, title: "When Where When" },
      { src: when5, title: "When Where When" },
    ],
  },
];
</script>

<template>
  <div class="gallery space-y-16 sm:space-y-20">
    <div v-for="(section, i) in sections" :key="i">
      <p class="section-label">{{ t(section.tag) }}</p>
      <h2 class="section-title">{{ t(section.title) }}</h2>

      <ClientOnly>
        <Swiper
          :modules="modules"
          :slides-per-view="1.2"
          :space-between="14"
          :centered-slides="false"
          :loop="true"
          :speed="500"
          :breakpoints="{
            640: { slidesPerView: 1.5, spaceBetween: 14 },
            768: { slidesPerView: 2.2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 18 },
          }"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :navigation="true"
          :autoplay="{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }"
          class="event-swiper mt-6"
        >
          <SwiperSlide v-for="slide in section.images" :key="slide.src">
            <div class="slide-inner">
              <img :src="slide.src" :alt="slide.title" loading="lazy" />
              <span class="slide-tag font-mono">{{ slide.title }}</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.font-display { font-family: "Space Grotesk", system-ui, sans-serif; }
.font-mono    { font-family: "JetBrains Mono", monospace; }

.section-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.35em;
  color: #7C5CFC;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 6px;
}

.section-title {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: #1C1530;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.event-swiper {
  width: 100%;
  padding: 4px 4px 44px !important;
}

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

/* Pagination */
:deep(.swiper-pagination-bullet) {
  background: #c9bdf7;
  opacity: 1;
  transition: all 0.25s ease;
}
:deep(.swiper-pagination-bullet-active) {
  background: #7c5cfc;
  width: 22px;
  border-radius: 999px;
}

/* Navigation */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  border: 0.5px solid rgba(20, 16, 43, 0.12);
  color: #1c1530;
  box-shadow: 0 4px 12px -4px rgba(20, 16, 43, 0.2);
  transition: all 0.2s ease;
}
:deep(.swiper-button-prev)::after,
:deep(.swiper-button-next)::after {
  font-size: 13px;
  font-weight: 700;
}
:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
  background: #7c5cfc;
  color: #fff;
  border-color: transparent;
}
</style>