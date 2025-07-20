<script setup>
import Mafia from "@/assets/img/mafia.png?url";
import whatWhere from "@/assets/img/whatWhere.png?url";
import Football from "@/assets/img/football.png?url";
import Movie from "@/assets/img/movie.png?url";
import Music from "@/assets/img/music.png?url";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

import { ref } from "vue";

const modules = [EffectCards];
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
			"Տեսարանն ու երաժշտությունը բավարա՞ր են ճանաչելու ֆիլմը , ուրեմն սա Ձեզ համար է:Կինո-վիկտորինան օգնելու է ավելի շատ բան իմանալ կինոաշխարհի մասին:",
	},
	{
		title: "Երաժշտական ​​վիկտորինա",
		src: Music,
		description:
			"«Ես գիտե՜մ պատասխանը» ավելի հաճախ կասեք Դուք, եթե երգերն ու կատարողներին ճանաչում եք առաջին ելևէջներից:Սա զվարճալի ու ջերմ մթնոլորտում անցկացվող վիկտորինա է:",
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
		<template v-slot:title>
			<h1
				class="text-3xl font-bold sm:text-4xl lg:tracking-tight text-black uppercase text-center"
			>
				Մեզ մոտ կգտնեք
			</h1></template
		>
	</LandingSectionhead>
	<div class="flex flex-col md:flex-row gap-8 items-center mt-16 overflow-hidden">
		<div class="w-full md:w-1/2 flex justify-center">
			<Swiper
				effect="cards"
				:grabCursor="true"
				:modules="modules"
				class="w-[17.5rem] h-[23.75rem]"
				@slideChange="onSlideChange"
			>
				<SwiperSlide v-for="(item, index) in swiperImages" :key="index">
					<img
						:src="item.src"
						:alt="item.title"
						class="object-cover w-full h-full rounded-lg"
					/>
				</SwiperSlide>
			</Swiper>
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
</style>
