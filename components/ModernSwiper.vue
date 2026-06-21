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

const swiperImages = [
	{ src: what8, title: "What Where When" },
	{ src: what7, title: "What Where When" },
	{ src: what9, title: "What Where When" },
	{ src: what2, title: "What Where When" },
	{ src: what5, title: "What Where When" },
	{ src: what3, title: "What Where When" },
	{ src: what4, title: "What Where When" },
	{ src: what1, title: "What Where When" },
	{ src: what6, title: "What Where When" },
];

const swiperImages2 = [
	{ src: when4, title: "When Where When" },
	{ src: when1, title: "When Where When" },
	{ src: when3, title: "When Where When" },
	{ src: when2, title: "When Where When" },
	{ src: when5, title: "When Where When" },
];
const swiperImages3 = [
	{ src: KarginHaxordum, title: "Kargin Haxordum" },
	{ src: KarginHaxordum11, title: "Kargin Haxordum" },
	{ src: KarginHaxordum2, title: "Kargin Haxordum" },
	{ src: KarginHaxordum9, title: "Kargin Haxordum" },
	{ src: KarginHaxordum13, title: "Kargin Haxordum" },
	{ src: KarginHaxordum3, title: "Kargin Haxordum" },
	{ src: KarginHaxordum8, title: "Kargin Haxordum" },
	{ src: KarginHaxordum10, title: "Kargin Haxordum" },
	{ src: KarginHaxordum12, title: "Kargin Haxordum" },
];
</script>

<template>
	<div class="gallery space-y-16 sm:space-y-20">
		<div>
			<p class="font-mono text-[11px] tracking-[0.35em] text-[#7C5CFC] mb-2 uppercase text-center">{{ t("QUIZ") }}</p>
			<h2 class="font-display sm:text-2xl text-2xl md:text-3xl font-bold text-[#1C1530] flex justify-center uppercase tracking-tight">
				{{ t("KARGIN_SKETCH") }}
			</h2>
			<ClientOnly>
				<Swiper
					:modules="modules"
					:slides-per-view="1.3"
					:space-between="20"
					:loop="true"
					:breakpoints="{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}"
					pagination
					navigation
					autoplay
					class="my-swiper mt-8"
				>
					<SwiperSlide v-for="slide in swiperImages3" :key="slide.src">
						<img :src="slide.src" :alt="slide.title" class="w-full h-full object-cover rounded-lg" />
					</SwiperSlide>
				</Swiper>
			</ClientOnly>
		</div>

		<div>
			<p class="font-mono text-[11px] tracking-[0.35em] text-[#7C5CFC] mb-2 uppercase text-center">{{ t("GAMES") }}</p>
			<h2 class="font-display sm:text-2xl text-2xl md:text-3xl font-bold text-[#1C1530] flex justify-center uppercase tracking-tight">
				{{ t("MAFIA") }}
			</h2>
			<ClientOnly>
				<Swiper
					:modules="modules"
					:slides-per-view="1.3"
					:space-between="20"
					:loop="true"
					:breakpoints="{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}"
					pagination
					navigation
					autoplay
					class="my-swiper mt-8"
				>
					<SwiperSlide v-for="slide in swiperImages" :key="slide.src">
						<img :src="slide.src" :alt="slide.title" class="w-full h-full object-cover rounded-lg" />
					</SwiperSlide>
				</Swiper>
			</ClientOnly>
		</div>

		<div>
			<p class="font-mono text-[11px] tracking-[0.35em] text-[#7C5CFC] mb-2 uppercase text-center">{{ t("QUIZ") }}</p>
			<h2 class="font-display sm:text-2xl text-2xl md:text-3xl font-bold text-[#1C1530] flex justify-center uppercase tracking-tight">
				{{ t("WHAT_WHERE_WHEN") }}
			</h2>
			<ClientOnly>
				<Swiper
					:modules="modules"
					:slides-per-view="1.3"
					:space-between="20"
					:loop="true"
					:breakpoints="{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}"
					pagination
					navigation
					autoplay
					class="my-swiper mt-8"
				>
					<SwiperSlide v-for="slide in swiperImages2" :key="slide.src">
						<img :src="slide.src" :alt="slide.title" class="w-full h-full object-cover rounded-lg" />
					</SwiperSlide>
				</Swiper>
			</ClientOnly>
		</div>
	</div>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.my-swiper {
	width: 100%;
	height: 21.875rem;
	overflow: hidden;
	background: transparent !important;
}

:deep(.swiper) {
	background: transparent !important;
}

:deep(.swiper-wrapper) {
	background: transparent !important;
	padding: 0px !important;
}

:deep(.swiper-slide) {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 18px;
	overflow: hidden;
	background: transparent !important;
	cursor: grab;
	box-shadow: 0 16px 36px -16px rgba(20, 16, 43, 0.35);
	transition: transform 0.3s ease;
}

:deep(.swiper-slide-active) {
	transform: scale(1.01);
}

/* Pagination dots */
:deep(.swiper-pagination-bullet) {
	background: #c9bdf7;
	opacity: 1;
	width: 8px;
	height: 8px;
	transition: all 0.25s ease;
}
:deep(.swiper-pagination-bullet-active) {
	background: #7c5cfc;
	width: 22px;
	border-radius: 999px;
}

/* Navigation arrows */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
	width: 2.5rem;
	height: 2.5rem;
	background: #ffffff;
	border-radius: 50%;
	box-shadow: 0 10px 24px -10px rgba(20, 16, 43, 0.4);
	color: #1c1530;
	transition: all 0.2s ease;
}
:deep(.swiper-button-prev)::after,
:deep(.swiper-button-next)::after {
	font-size: 0.9rem;
	font-weight: 700;
}
:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
	background: linear-gradient(135deg, #7c5cfc, #6b4ce0);
	color: #fff;
}

@media (min-width: 640px) {
	.my-swiper {
		height: 16rem;
	}
}

@media (min-width: 1024px) {
	.my-swiper {
		height: 19rem;
	}
}
</style>