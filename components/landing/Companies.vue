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
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import { EffectCube, Pagination } from "swiper/modules";

const modules = [EffectCube, Pagination];
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

	<div class="overflow-hidden py-5 sm:py-10 bg-[#00308F] group mt-10 ">
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

	<div class="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-10 overflow-hidden">
		<Swiper
			:effect="'cube'"
			:grab-cursor="true"
			class="w-full sm:w-[27rem] h-[30rem]"
			:cube-effect="{
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			}"
			:pagination="true"
			:modules="modules"
		>
			<SwiperSlide v-for="(item, index) in swiperImages" :key="index">
				<img
					:src="item.src"
					:alt="item.title"
					class="object-cover w-full h-full rounded-lg pointer-events-auto"
				/>
			</SwiperSlide>
		</Swiper>

		<Swiper
			:effect="'cube'"
			:grab-cursor="true"
			class="w-full sm:w-[27rem] h-[30rem]"
			:cube-effect="{
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			}"
			:pagination="true"
			:modules="modules"
		>
			<SwiperSlide v-for="(item, index) in swiperImages2" :key="index">
				<img
					:src="item.src"
					:alt="item.title"
					class="object-cover w-full h-full rounded-lg pointer-events-auto"
				/>
			</SwiperSlide>
		</Swiper>
	</div>
	<p class="my-10 text-black lg:px-40 w-full mx-auto font-medium">
		EventNest-ում անցկացվող ամեն մի իրադարձություն՝ լինի դա «Ի՞նչ, Որտե՞ղ, Ե՞րբ» խաղը,
		ֆուտբոլային վիկտորինա, ֆուտբոլային մրցաշար, «Մաֆիա» խաղը կամ որևէ այլ խելացի ու զվարճալի
		ինտելեկտուալ խաղ, մի նպատակ ունի՝ համախմբել, ոգեշնչել և ստեղծել հիշարժան ու ջերմ երեկոներ։
		Մեր սիրված առաջին գործընկերը՝ 73 Club-ը, դարձավ այն հարթակը, որտեղ EventNest-ը մեկնարկեց իր
		պատմությունը։ Այստեղ ծնվեց մթնոլորտ, որտեղ միախառնվում են խաղը, խելքը և ընկերությունը՝
		ստեղծելով յուրօրինակ փորձառություն բոլորի համար։
	</p>

	<p class="my-10 text-black lg:px-40 w-full mx-auto font-medium">
		Մեր «Ի՞նչ, Որտե՞ղ, Ե՞րբ» խաղում Trendi Salon-ը տրամադրում է նվեր քարտեր՝ իրենց գեղեցկության
		սրահի ծառայություններից օգտվելու համար։ Trendi Bijoux-ը պարգևատրում է առաջին տեղը զբաղեցրած
		թիմին՝ ոճային և շքեղ զարդերով։ Karaoke Duo Battle Rush Pub-ում Մեր գործընկեր Kechi House 132
		հյուրանոցը նվիրել է հաղթող զույգին հանգիստ Ծաղկաձորի իրենց հյուրանոցում։ Միացիր
		EventNest-ին՝ մասնակցիր, հաղթիր և վայելիր բացառիկ նվերներ մեր գործընկերների կողմից։
	</p>
</template>
<style>
.swiper-slide {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 18px;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
</style>
