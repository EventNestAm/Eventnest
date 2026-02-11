<script setup>
import Mafia from "@/assets/img/mafia.png?url";
import whatWhere from "@/assets/img/whatWhere.png?url";
import Football from "@/assets/img/football.png?url";
import Movie from "@/assets/img/movie.png?url";
import Music from "@/assets/img/music.png?url";
import Kargincinema from "@/assets/img/Kargincinema.png?url";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { EffectCards, Navigation } from "swiper/modules";
import { ref } from "vue";

const { t } = useI18n();
const localePath = useLocalePath();

const modules = [EffectCards, Navigation];
const activeIndex = ref(0);

const swiperImages = [
	{
		title: t("KARGIN_SKETCH"),
		src: Kargincinema,
		description: t("KARGIN_DESC"),
	},
	{
		title: t("MAFIA"),
		src: Mafia,
		description: t("MAFIA_DESC"),
	},
	{
		title: t("WHAT_WHERE_WHEN"),
		src: whatWhere,
		description: t("WHAT_WHERE_WHEN_DESC"),
	},
	{
		title: t("MOVIE_QUIZ"),
		src: Movie,
		description: t("MOVIE_QUIZ_DESC"),
	},
	{
		title: t("MUSIC_QUIZ"),
		src: Music,
		description: t("MUSIC_QUIZ_DESC"),
	},
	{
		title: t("FOOTBALL_QUIZ"),
		src: Football,
		description: t("FOOTBALL_QUIZ_DESC"),
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
				class="sm:text-xl text-2xl md:text-3xl font-bold lg:tracking-tight text-black uppercase text-center"
			>
				{{ t('YOU_WILL_FIND') }}
			</h1>
		</template>
	</LandingSectionhead>

	<div
		class="flex flex-col md:flex-row gap-8 items-center justify-center mt-8 sm:mt-12 md:mt-16 overflow-hidden"
	>
		<div class="relative w-full md:w-1/2 flex justify-center items-center pb-5">
			<button
				class="swiper-button-prev-custom absolute left-0 md:-left-0 xl:left-32 z-10 bg-[#00308F] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300"
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
				class="swiper-button-next-custom absolute right-0 md:-right-0 xl:right-32 z-10 bg-[#00308F] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300"
			>
				→
			</button>
		</div>

		<div class="w-full md:w-1/2 p-4 md:p-8 bg-[#00308F] rounded-3xl">
			<h3 class="font-semibold text-2xl sm:text-3xl md:text-4xl mb-4 text-white uppercase">
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

.swiper-button-next,
.swiper-button-prev {
	display: none !important;
}
</style>
