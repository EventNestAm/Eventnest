<script setup>
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
import { Swiper, SwiperSlide } from "swiper/vue";

import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/grid";

const { t } = useI18n();

const modules = [Pagination, FreeMode];

const swiperImages = [
	{
		src: what8,
		title: "What Where When",
	},
	{
		src: what7,
		title: "What Where When",
	},
	{
		src: what9,
		title: "What Where When",
	},
	{
		src: what2,
		title: "What Where When",
	},
	{
		src: what5,
		title: "What Where When",
	},
	{
		src: what3,
		title: "What Where When",
	},
	{
		src: what4,
		title: "What Where When",
	},
	{
		src: what1,
		title: "What Where When",
	},
	{
		src: what6,
		title: "What Where When",
	},
];

const swiperImages2 = [
	{
		src: when4,
		title: "When Where When",
	},
	{
		src: when1,
		title: "When Where When",
	},
	{
		src: when3,
		title: "When Where When",
	},
	{
		src: when2,
		title: "When Where When",
	},
	{
		src: when5,
		title: "When Where When",
	},
];

const swiperImages3 = [
	{
		src: "/img/KarginHaxordum/KarginHaxordum.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum1.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum2.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum3.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum4.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum5.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum6.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum7.jpg",
		title: "Kargin Haxordum",
	},
	{
		src: "/img/KarginHaxordum/KarginHaxordum8.jpg",
		title: "Kargin Haxordum",
	},
];

const baseSwiperOptions = {
	modules,
	spaceBetween: 16,
	grabCursor: true,
	freeMode: true,
	pagination: {
		clickable: true,
	},
	breakpoints: {
		0: {
			slidesPerView: 1.2,
			centeredSlides: true,
			spaceBetween: 16,
		},
		640: {
			slidesPerView: 2.2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3.2,
			spaceBetween: 24,
		},
		1440: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
};
</script>

<template>
	<div class="grid gap-5 sm:gap-7 md:gap-10 mt-10 overflow-hidden pb-2">
		<h2 class="sm:text-xl text-2xl md:text-3xl font-semibold text-black mx-auto">
			{{ t("KARGIN_SKETCH") }}
		</h2>

		<ClientOnly>
			<Swiper v-bind="baseSwiperOptions" class="gallery-swiper">
				<SwiperSlide v-for="(item, index) in swiperImages3" :key="index">
					<img :src="item.src" :alt="item.title" class="gallery-img" />
				</SwiperSlide>
			</Swiper>
		</ClientOnly>

		<h2 class="sm:text-xl text-2xl md:text-3xl font-semibold text-black mx-auto">
			{{ t("MAFIA") }}
		</h2>

		<ClientOnly>
			<Swiper v-bind="baseSwiperOptions" class="gallery-swiper">
				<SwiperSlide v-for="(item, index) in swiperImages2" :key="index">
					<img :src="item.src" :alt="item.title" class="gallery-img" />
				</SwiperSlide>
			</Swiper>
		</ClientOnly>

		<h2 class="sm:text-xl text-2xl md:text-3xl font-semibold text-black mx-auto">
			{{ t("WHAT_WHERE_WHEN") }}
		</h2>

		<ClientOnly>
			<Swiper v-bind="baseSwiperOptions" class="gallery-swiper">
				<SwiperSlide v-for="(item, index) in swiperImages" :key="index">
					<img :src="item.src" :alt="item.title" class="gallery-img" />
				</SwiperSlide>
			</Swiper>
		</ClientOnly>
	</div>

	<p class="my-5 text-gray-800 lg:px-40 w-full mx-auto font-medium px-5">
		{{ t("EVENTNEST_DESC") }}
		<span class="text-purple-600 font-semibold">73 Club</span>{{ t("EVENTNEST_DESC_FIRST") }}։
	</p>

	<p class="my-5 text-gray-800 lg:px-40 w-full mx-auto font-medium px-5">
		{{ t("EVENTNEST_DESC_SECOND") }}
		<span class="text-purple-600 font-semibold">Trendi Salon</span>
		{{ t("EVENTNEST_DESC_THIRD") }}
		<span class="text-purple-600 font-semibold">Trendi Bijoux</span>
		{{ t("EVENTNEST_DESC_FOURTH") }}
		<span class="text-purple-600 font-semibold">Kechi House 132</span>
		{{ t("EVENTNEST_DESC_FIVE") }}
	</p>
</template>

<style scoped>
.gallery-swiper {
	width: 100%;
	padding-bottom: 2rem;
}

.gallery-img {
	width: 100%;
	height: 18rem;
	object-fit: cover;
	border-radius: 18px;
	transition: transform 0.4s ease;
}

@media (min-width: 640px) {
	.gallery-img {
		height: 22rem;
	}
}

@media (min-width: 1024px) {
	.gallery-img {
		height: 26rem;
	}
}

.gallery-img:hover {
	transform: scale(1.04);
}

.gallery-swiper .swiper-slide {
	background: transparent !important;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
		overflow: hidden;
}

:deep(.swiper-wrapper) {
	padding: 0px !important;
}

</style>
