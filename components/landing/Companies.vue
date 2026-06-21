<script setup>
const logos = [
	{
		src: "/partners/loft.jpg",
		link: "https://www.instagram.com/loft.yerevan/",
	},
	{
		src: "/partners/kondhouse.png",
		link: "https://www.facebook.com/kondhouse",
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
		src: "/partners/yerevanacademy.jpg",
		link: "https://yerevanacademy.com/",
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
	<section class="partners">
		<h2
			class="font-display text-2xl sm:text-3xl font-bold text-[#1C1530] text-center tracking-tight uppercase"
		>
			{{ t("OUR_PARTNERS") }}
		</h2>

		<div class="partners__track-wrap mt-7 sm:mt-10 group">
			<div class="partners__fade partners__fade--left" aria-hidden="true"></div>
			<div class="partners__fade partners__fade--right" aria-hidden="true"></div>

			<div
				class="flex gap-6 sm:gap-8 whitespace-nowrap group-hover:[animation-play-state:paused] animate-slide"
			>
				<a
					v-for="(logo, index) in duplicatedLogos"
					:key="index"
					:href="logo.link"
					target="_blank"
					rel="noopener noreferrer"
					class="partners__logo"
				>
					<NuxtImg
						:src="logo.src"
						alt="Sponsor"
						width="210"
						height="160"
						format="webp"
						quality="90"
						loading="lazy"
						class="w-full h-full object-cover rounded-[14px]"
					/>
				</a>
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

.partners {
	padding: 2.5rem 0;
}

.partners__track-wrap {
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	background: radial-gradient(120% 180% at 50% 50%, #221a44 0%, #14102b 70%, #0f0c20 100%);
	padding: 1.5rem 0;
	border-radius: 1.25rem;
}

.partners__fade {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 4rem;
	z-index: 10;
	pointer-events: none;
}
.partners__fade--left {
	left: 0;
	background: linear-gradient(90deg, #14102b, transparent);
}
.partners__fade--right {
	right: 0;
	background: linear-gradient(270deg, #14102b, transparent);
}

.partners__logo {
	flex-shrink: 0;
	width: 5rem;
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 16px;
	background: #fffcf7;
	box-shadow: 0 8px 20px -10px rgba(0, 0, 0, 0.4);
	transition:
		transform 0.25s ease,
		box-shadow 0.25s ease;
	padding: 4px;
}

@media (min-width: 640px) {
	.partners__logo {
		width: 11rem;
		height: 8.5rem;
		padding: 8px;
	}
}

.partners__logo:hover {
	transform: translateY(-4px);
	box-shadow: 0 16px 32px -10px rgba(124, 92, 252, 0.5);
}

.animate-slide {
	display: flex;
	width: max-content;
	animation: slide 25s linear infinite;
	flex-wrap: nowrap;
}

@keyframes slide {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}

@media (max-width: 640px) {
	.animate-slide {
		animation-duration: 30s;
	}
}
</style>
