<script setup>
import Mafia from "@/assets/img/quizes/mafia.png?url";
import whatWhere from "@/assets/img/quizes/whatWhere.png?url";
import Football from "@/assets/img/quizes/football.png?url";
import Movie from "@/assets/img/quizes/movie.png?url";
import Music from "@/assets/img/quizes/music.png?url";
import Kargincinema from "@/assets/img/quizes/Kargincinema.png?url";

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
	<section class="showcase">
		<p class="font-mono text-[11px] tracking-[0.35em] text-[#7C5CFC] mb-2 uppercase text-center">
			{{ t("QUIZ") }}
		</p>
		<h1 class="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1530] text-center tracking-tight uppercase">
			{{ t("YOU_WILL_FIND") }}
		</h1>

		<div class="flex flex-col md:flex-row gap-8 items-stretch justify-center mt-10 md:mt-14 overflow-hidden">
			<div class="relative w-full md:w-1/2 flex justify-center items-center pb-5">
				<button class="nav-btn nav-btn--prev swiper-button-prev-custom">←</button>

				<ClientOnly>
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
							<img :src="item.src" :alt="item.title" class="object-cover w-full h-full rounded-xl" />
						</SwiperSlide>
					</Swiper>
				</ClientOnly>

				<button class="nav-btn nav-btn--next swiper-button-next-custom">→</button>
			</div>

			<div class="w-full md:w-1/2 info-panel">
				<span class="font-mono text-[10px] tracking-[0.3em] text-[#FF6F4D] uppercase">
					{{ String(activeIndex + 1).padStart(2, "0") }} / {{ String(swiperImages.length).padStart(2, "0") }}
				</span>
				<h3 class="font-display font-bold text-2xl sm:text-3xl md:text-4xl mt-3 mb-4 text-white">
					{{ swiperImages[activeIndex].title }}
				</h3>
				<p class="text-[#C7C1E0] leading-relaxed text-base sm:text-lg">
					{{ swiperImages[activeIndex].description }}
				</p>
			</div>
		</div>
	</section>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.showcase {
	padding: 2.5rem 1rem;
}

.nav-btn {
	position: absolute;
	z-index: 10;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
	color: #1c1530;
	box-shadow: 0 10px 24px -10px rgba(20, 16, 43, 0.4);
	border: 1px solid rgba(28, 21, 48, 0.06);
	transition: all 0.2s ease;
}
.nav-btn:hover {
	background: linear-gradient(135deg, #7c5cfc, #6b4ce0);
	color: #fff;
	transform: translateY(-2px);
	box-shadow: 0 14px 28px -10px rgba(124, 92, 252, 0.55);
}
.nav-btn--prev {
	left: 0;
}
@media (min-width: 1280px) {
	.nav-btn--prev {
		left: 8rem;
	}
}
.nav-btn--next {
	right: 0;
}
@media (min-width: 1280px) {
	.nav-btn--next {
		right: 8rem;
	}
}

.info-panel {
	padding: 1.75rem;
	border-radius: 1.5rem;
	background: radial-gradient(120% 140% at 50% 0%, #221a44 0%, #14102b 65%, #0f0c20 100%);
	display: flex;
	flex-direction: column;
	justify-content: center;
}

@media (min-width: 768px) {
	.info-panel {
		padding: 2.5rem;
	}
}
</style>

<style>
.swiper-slide {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 18px;
	overflow: hidden;
	box-shadow: 0 16px 36px -14px rgba(20, 16, 43, 0.4);
}

.swiper-button-next,
.swiper-button-prev {
	display: none !important;
}
</style>