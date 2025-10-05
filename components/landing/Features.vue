<script setup>
import Mafia from "@/assets/img/mafia.png?url";
import whatWhere from "@/assets/img/whatWhere.png?url";
import Football from "@/assets/img/football.png?url";
import Movie from "@/assets/img/movie.png?url";
import Music from "@/assets/img/music.png?url";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { EffectCards, Navigation } from "swiper/modules";
import { ref } from "vue";

const modules = [EffectCards, Navigation];
const activeIndex = ref(0);

const swiperImages = [
	{
		title: "Մաֆիա",
		src: Mafia,
		description:
			"«Մաֆիա» կամ «Կարմիր, թե՞ սև»: Եվ´սպորտային, և´ դասական, որին կարող ես մասնակցել անհատապես կամ հենց քո թիմով:",
	},
	{
		title: "Ինչ, որտեղ, երբ",
		src: whatWhere,
		description:
			"Ինտելեկտուալ հարց ու պատասխանի խաղ, որտեղ թիմերը պատասխան են տալիս բարդ ու տրամաբանական հարցերին։",
	},
	{
		title: "Կինո վիկտորինա",
		src: Movie,
		description:
			"Տեսարանն ու երաժշտությունը բավարա՞ր են ճանաչելու ֆիլմը , ուրեմն սա Ձեզ համար է: Կինո-վիկտորինան օգնելու է ավելի շատ բան իմանալ կինոաշխարհի մասին:",
	},
	{
		title: "Երաժշտական ​​վիկտորինա",
		src: Music,
		description:
			"«Ես գիտե՜մ պատասխանը» ավելի հաճախ կասեք Դուք, եթե երգերն ու կատարողներին ճանաչում եք առաջին ելևէջներից: Սա զվարճալի ու ջերմ մթնոլորտում անցկացվող վիկտորինա է:",
	},
	{
		title: "Ֆուտբոլային վիկտորինա",
		src: Football,
		description:
			"Ֆուտբոլի սիրահարների համար՝ թիմեր, խաղացողներ ու լիգաներ. տեսնենք՝ որքան լավ եք ճանաչում խաղը։",
	},
];

const onSlideChange = (swiper) => {
	activeIndex.value = swiper.activeIndex;
};
</script>

<template>
	<LandingSectionhead>
		<template #title>
			<h1
				class="text-3xl font-bold sm:text-4xl lg:tracking-tight text-black uppercase text-center"
			>
				Մեզ մոտ կգտնեք
			</h1>
		</template>
	</LandingSectionhead>

	<div class="flex flex-col md:flex-row gap-8 items-center justify-center mt-16 overflow-hidden">
		<div class="relative w-full md:w-1/2 flex justify-center items-center pb-5">
			<button
				class="swiper-button-prev-custom absolute left-0 md:-left-0 xl:left-32 z-10 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-purple-700 transition-all duration-300"
			>
				←
			</button>

			<Swiper
				effect="cards"
				:grabCursor="true"
				:modules="modules"
				:navigation="{
					nextEl: '.swiper-button-next-custom',
					prevEl: '.swiper-button-prev-custom',
				}"
				class="w-[17.5rem] h-[23.75rem]"
				@slideChange="onSlideChange"
			>
				<SwiperSlide v-for="(item, index) in swiperImages" :key="index">
					<img
						:src="item.src"
						:alt="item.title"
						class="object-cover w-full h-full rounded-xl"
					/>
				</SwiperSlide>
			</Swiper>

			<button
				class="swiper-button-next-custom absolute right-0 md:-right-0 xl:right-32 z-10 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-purple-700 transition-all duration-300"
			>
				→
			</button>
		</div>

		<div class="w-full md:w-1/2 p-4 md:p-8 bg-[#00308F] rounded-3xl">
			<h3 class="font-semibold text-4xl mb-4 text-white uppercase">
				{{ swiperImages[activeIndex].title }}
			</h3>
			<p class="text-white leading-relaxed text-lg">
				{{ swiperImages[activeIndex].description }}
			</p>
		</div>
	</div>
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

/* Disable default Swiper nav styles */
.swiper-button-next,
.swiper-button-prev {
	display: none !important;
}
</style>
