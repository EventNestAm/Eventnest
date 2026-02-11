<script setup>
const logos = [
	{
		src: "/partners/loft.jpg",
		link: "https://www.instagram.com/loft.yerevan/",
	},
	{
		src: "/partners/rockfour.jpg",
		link: "https://www.rockfour.am/hy",
	},
	{
		src: "/partners/foresttea.jpg",
		link: "https://www.instagram.com/forest.teaa/",
	},
	{
		src: "/partners/layersYerevan.jpg",
		link: "https://www.facebook.com/p/Layers-Bar-Yerevan-61574750327761/",
	},
	{ src: "/partners/73club.jpeg", link: "https://www.facebook.com/73clubevn" },
	{
		src: "/partners/trendiSalon.jpeg",
		link: "https://www.facebook.com/p/Trendi-Salon-100064029343784/",
	},
	{
		src: "/partners/trendibijoux.jpg",
		link: "https://www.facebook.com/TrendiBijouxJewellery/?locale=ru_RU",
	},
	{
		src: "/partners/kechiHouse.jpg",
		link: "https://www.facebook.com/p/Kechi-House-Tsaghkadzor_apartment-132-100077334251087/",
	},
	{ src: "/partners/rush.jpg", link: "https://www.facebook.com/RushPubYVN/" },
];

const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

const { t } = useI18n();
</script>

<template>
	<section>
		<h2
			class="sm:text-xl text-2xl md:text-3xl font-bold lg:tracking-tight text-black uppercase text-center"
		>
			{{ t("OUR_PARTNERS") }}
		</h2>

		<div class="overflow-hidden py-5 sm:py-10 bg-[#00308F] group mt-5 sm:mt-7 md:mt-10">
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
						alt="միջոցառումների կազմակերպում EventNest"
						class="w-full h-full object-cover rounded-2xl"
					/>
				</a>
			</div>
		</div>
	</section>
</template>

<style scoped>
@keyframes slide {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}

.animate-slide {
	display: flex;
	width: max-content;
	animation: slide 25s linear infinite;
	flex-wrap: nowrap;
}

.overflow-hidden {
  overflow: hidden;
  white-space: nowrap; 
}

@media (max-width: 640px) {
  .animate-slide {
    animation-duration: 30s; 
  }
}
</style>
