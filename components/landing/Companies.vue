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
		src: "/partners/medines.jpg",
		link: "https://medines.am/",
	},
	{
		src: "/partners/tomsarkx.png",
		link: "https://www.tomsarkgh.am/",
	},
	{
		src: "/partners/fast.jpg",
		link: "https://fastticket.am/",
	},
	{
		src: "/partners/eventhub.png",
		link: "https://eventhub.am/",
	},
	{
		src: "/partners/telcellWallet.jpg",
		link: "https://telcell.am/hy/wallet",
	},
	{
		src: "/partners/ticketSystem.png",
		link: "https://www.ticketsystem.am/",
	},
	{
		src: "/partners/ticketon.png",
		link: "https://ticketon.am/hy/home",
	},
	{
		src: "/partners/foresttea.jpg",
		link: "https://www.instagram.com/forest.teaa/",
	},
	{ src: "/partners/73club.jpeg", link: "https://www.facebook.com/73clubevn" },
	{
		src: "/partners/trendiSalon.jpeg",
		link: "https://www.instagram.com/trendi.salon/",
	},
	{
		src: "/partners/show4me.png",
		link: "https://show4me.com/interaction/feed/featured",
	},
	{
		src: "/partners/trendibijoux.jpg",
		link: "https://www.instagram.com/trendi.salon_bijoux/",
	},
	{
		src: "/partners/davGarden.jpg",
		link: "https://www.instagram.com/dav.garden/",
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
					class="flex-shrink-0 w-22 sm:w-52 h-20 sm:h-40 flex items-center justify-center rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
				>
					<NuxtImg
						:src="logo.src"
						alt="Sponsor"
						width="210"
						height="160"
						format="webp"
						quality="90"
						loading="lazy"
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
