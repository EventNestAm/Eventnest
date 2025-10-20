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

import { Navigation, Pagination, Scrollbar, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = [Navigation, Pagination, Scrollbar, FreeMode];
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

const logos = [
	{
		src: "partners/layersYerevan.jpg",
		link: "https://www.facebook.com/p/Layers-Bar-Yerevan-61574750327761/",
	},
	{
		src: "partners/73club.jpeg",
		link: "https://www.facebook.com/73clubevn",
	},
	{
		src: "partners/trendiSalon.jpeg",
		link: "https://www.facebook.com/p/Trendi-Salon-100064029343784/",
	},
	{
		src: "partners/trendiBijoux.png",
		link: "https://www.facebook.com/TrendiBijouxJewellery/?locale=ru_RU",
	},
	{
		src: "partners/kechiHouse.jpg",
		link: "https://www.facebook.com/p/Kechi-House-Tsaghkadzor_apartment-132-100077334251087/",
	},
	{
		src: "partners/rush.jpg",
		link: "https://www.facebook.com/RushPubYVN/",
	},
];

const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];
</script>

<template>
	<h2 class="text-3xl font-bold lg:tracking-tight text-black uppercase text-center">
		Մեր գործընկերները
	</h2>

	<div class="overflow-hidden py-5 sm:py-10 bg-[#00308F] group mt-10">
		<div
			class="flex gap-10 whitespace-nowrap group-hover:[animation-play-state:paused] animate-slide"
		>
			<a
				v-for="(logo, index) in duplicatedLogos"
				:key="index"
				:href="logo.link"
				target="_blank"
				rel="noopener noreferrer"
				class="flex-shrink-0 w-20 sm:w-52 h-20 sm:h-40 flex items-center justify-center rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
			>
				<img
					:src="logo.src"
					alt="Partner Logo"
					class="w-full h-full object-cover rounded-2xl"
				/>
			</a>
		</div>
	</div>
	<div class="grid gap-10 mt-10 overflow-hidden pb-2">
		<h2 class="text-3xl font-semibold text-black mx-auto">Մաֆիա</h2>

		<Swiper
			:slidesPerView="1.5"
			:breakpoints="{
				501: { slidesPerView: 2.2 },
				769: { slidesPerView: 2.4 },
				1025: { slidesPerView: 3.2 },
			}"
			:spaceBetween="30"
			:freeMode="true"
			:grab-cursor="true"
			:pagination="{
				clickable: true,
				el: '.swiper-pagination-mafia',
			}"
			:modules="modules"
			class="w-full sm:w-full h-[20rem] sm:h-[25rem] md:h-[30rem] !pb-5"
		>
			<SwiperSlide v-for="(item, index) in swiperImages" :key="index">
				<img
					:src="item.src"
					:alt="item.title"
					class="object-cover w-full h-full pointer-events-auto"
				/>
			</SwiperSlide>
		</Swiper>

		<div class="swiper-pagination-mafia flex justify-center"></div>

		<h2 class="text-3xl font-semibold text-black mx-auto">Ինչ որտեղ երբ</h2>

		<Swiper
			:slidesPerView="1.5"
			:breakpoints="{
				501: { slidesPerView: 2.2 },
				769: { slidesPerView: 2.4 },
				1025: { slidesPerView: 3.2 },
			}"
			:spaceBetween="30"
			:freeMode="true"
			:grab-cursor="true"
			:pagination="{
				clickable: true,
				el: '.swiper-pagination-when',
			}"
			:modules="modules"
			class="w-full sm:w-full h-[20rem] sm:h-[25rem] md:h-[30rem] !pb-5"
		>
			<SwiperSlide v-for="(item, index) in swiperImages2" :key="index">
				<img
					:src="item.src"
					:alt="item.title"
					class="object-cover w-full h-full pointer-events-auto"
				/>
			</SwiperSlide>
		</Swiper>

		<div class="swiper-pagination-when flex justify-center"></div>
	</div>
	<p class="my-5 text-gray-800 lg:px-40 w-full mx-auto font-medium px-5">
		EventNest-ի յուրաքանչյուր իրադարձություն՝ լինի դա «Ի՞նչ, Որտե՞ղ, Ե՞րբ», ֆուտբոլային
		վիկտորինա, «Մաֆիա» կամ այլ խելացի խաղ, միավորում է մարդկանց՝ ստեղծելով հիշարժան և ջերմ
		երեկոներ։ Մեր առաջին գործընկերը՝
		<span class="text-purple-600 font-semibold">73 Club</span>-ը, դարձավ այն վայրը, որտեղ ծնվեց
		EventNest-ի յուրահատուկ մթնոլորտը՝ խաղի, խելքի և ընկերության համադրությամբ։
	</p>

	<p class="my-5 text-gray-800 lg:px-40 w-full mx-auto font-medium px-5">
		Մեր խաղերին միանում են գործընկերներ, որոնք հաճելի անակնկալներ են պարգևում հաղթողներին։
		<span class="text-purple-600 font-semibold">Trendi Salon</span>-ը տրամադրում է նվեր քարտեր,
		<span class="text-purple-600 font-semibold">Trendi Bijoux</span>-ը պարգևատրում է ոճային
		զարդերով, իսկ <span class="text-purple-600 font-semibold">Kechi House 132</span>-ը
		հյուրասիրում է հանգիստ Ծաղկաձորում։ Միացիր EventNest-ին՝ մասնակցիր, հաղթիր և վայելիր բացառիկ
		նվերներ։
	</p>
</template>
<style scoped>
:deep(.swiper-slide) {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 18px;
	overflow: hidden;
}

:deep(.swiper-pagination-bullet) {
	background-color: #6b21a8 !important;
	opacity: 0.4;
	transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
	background-color: #9333ea !important;
	opacity: 1;
	transform: scale(1.2);
}

:deep(.swiper-wrapper) {
	padding: 0px !important;
}
</style>
