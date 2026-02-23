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
import KarginHaxordum1 from "@/assets/img/KarginHaxordum/karginHaxordum1.jpg";
import KarginHaxordum2 from "@/assets/img/KarginHaxordum/karginHaxordum2.jpg";
import KarginHaxordum3 from "@/assets/img/KarginHaxordum/karginHaxordum3.jpg";
import KarginHaxordum4 from "@/assets/img/KarginHaxordum/karginHaxordum4.jpg";
import KarginHaxordum5 from "@/assets/img/KarginHaxordum/karginHaxordum5.jpg";
import KarginHaxordum6 from "@/assets/img/KarginHaxordum/karginHaxordum6.jpg";
import KarginHaxordum7 from "@/assets/img/KarginHaxordum/karginHaxordum7.jpg";
import KarginHaxordum8 from "@/assets/img/KarginHaxordum/karginHaxordum8.jpg";

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
	{ src: KarginHaxordum1, title: "Kargin Haxordum" },
	{ src: KarginHaxordum2, title: "Kargin Haxordum" },
	{ src: KarginHaxordum3, title: "Kargin Haxordum" },
	{ src: KarginHaxordum4, title: "Kargin Haxordum" },
	{ src: KarginHaxordum5, title: "Kargin Haxordum" },
	{ src: KarginHaxordum6, title: "Kargin Haxordum" },
	{ src: KarginHaxordum7, title: "Kargin Haxordum" },
	{ src: KarginHaxordum8, title: "Kargin Haxordum" },
];
</script>

<template>
	<div class="space-y-12">
		<h2 class="sm:text-xl text-2xl md:text-3xl font-semibold text-black flex justify-center">
			{{ t("KARGIN_SKETCH") }}
		</h2>
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
			class="my-swiper"
		>
			<SwiperSlide v-for="slide in swiperImages3" :key="slide.src">
				<img
					:src="slide.src"
					:alt="slide.title"
					class="w-full h-full object-cover rounded-lg"
				/>
			</SwiperSlide>
		</Swiper>

		<h2 class="sm:text-xl text-2xl md:text-3xl font-semibold text-black flex justify-center">
			{{ t("MAFIA") }}
		</h2>
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
			class="my-swiper"
		>
			<SwiperSlide v-for="slide in swiperImages" :key="slide.src">
				<img
					:src="slide.src"
					:alt="slide.title"
					class="w-full h-full object-cover rounded-lg"
				/>
			</SwiperSlide>
		</Swiper>

		<h2 class="sm:text-xl text-2xl md:text-3xl font-semibold text-black flex justify-center">
			{{ t("WHAT_WHERE_WHEN") }}
		</h2>

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
			class="my-swiper"
		>
			<SwiperSlide v-for="slide in swiperImages2" :key="slide.src">
				<img
					:src="slide.src"
					:alt="slide.title"
					class="w-full h-full object-cover rounded-lg"
				/>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<style scoped>
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
}



@media (min-width: 640px) {
	.my-swiper {
		height: 25rem;
	}
}

@media (min-width: 1024px) {
	.my-swiper {
		height: 31.25rem;
	}
}

</style>
