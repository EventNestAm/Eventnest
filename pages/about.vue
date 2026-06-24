<script setup>
import JoinUs from "~/assets/img/team/joinUs.png";
import MiqoPhoto from "~/assets/img/team/Miqophoto.jpg";
import Artphoto from "~/assets/img/team/Artphoto.jpg";
import Davophoto from "~/assets/img/team/Davophoto.jpg";
import Anahitphoto from "~/assets/img/team/Anahitphoto.jpg";
import Asyaphoto from "~/assets/img/team/Asyaphoto.jpg";
import Elvinaphoto from "~/assets/img/team/Elvinaphoto.png";
import Karinkaphoto from "~/assets/img/team/Karinkaphoto.jpg";
import Elenphoto from "~/assets/img/team/Elenphoto.jpg";
import Emma from "~/assets/img/team/Emma.jpg";
import Azat from "~/assets/img/team/Azat.png";

const router = useRouter();

definePageMeta({
	layout: "landing",
});

const TeamImg3 = JoinUs;
const { t } = useI18n();
const localePath = useLocalePath();
const team = [
	{
		name: "Միքայել Գուբրյան",
		title: t("CEO_FOUNDER"),
		avatar: { src: MiqoPhoto },
	},
	{
		name: "Արթուր Դերձյան",
		title: t("CREATIVE_DIRECTOR"),
		avatar: { src: Artphoto },
	},
	{
		name: "Դավիթ Գուբրյան",
		title: t("EVENTS_SPECIALIST"),
		avatar: { src: Davophoto },
	},
	{
		name: "Էմմա Զորիկյան",
		title: t("REELS_MAKER"),
		avatar: { src: Emma },
	},
	{
		name: "Ազատ Սիրեկանյան",
		title: "DJ",
		avatar: { src: Azat },
	},
	{
		name: "Անահիտ Ալոյան",
		title: t("GRAPHICDESIGNER"),
		avatar: { src: Anahitphoto },
	},
	{
		name: "Էլվինա Ստեփանյան",
		title: t("UIUXDESIGNER"),
		avatar: { src: Elvinaphoto },
	},
	{
		name: t("ITS_YOU"),
		title: t("WAITING_FOR_YOU"),
		link: localePath("/contact"),
		avatar: { src: TeamImg3 },
		isInvite: true,
	},
];
</script>

<template>
	<LandingContainer>
		<div class="pt-32 sm:pt-28"></div>
		<LandingFeatures></LandingFeatures>
		<div class="mt-10"></div>
	</LandingContainer>

	<LandingCompanies />

	<section class="about-hero">
		<div class="hero-glow"></div>
		<div class="relative z-10 max-w-3xl mx-auto px-4 text-center">
			<p class="font-mono text-[11px] tracking-[0.35em] text-[#FF6F4D] mb-4 uppercase">
				{{ t("ABOUT_US") }}
			</p>
			<h1 class="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-5">
				{{ t("ABOUT_US") }}
			</h1>
			<p class="text-[#C7C1E0] text-base sm:text-lg leading-relaxed">{{t("WE_ARE")}}</p>
		</div>
	</section>

	<LandingContainer>
		<div class="-mt-10 sm:-mt-12 relative z-10 mb-16">
			<div class="about-panel">
				<p class="text-lg leading-relaxed font-medium text-[#1C1530] text-center">
					{{ t("WE_BELIEVE") }}
					<strong class="text-[#7C5CFC]">EventNest</strong> {{ t("WE_BELIEVE_SECOND") }}
				</p>
				<p class="text-lg font-medium mt-6 text-[#1C1530] text-center">
					{{ t("WE_GROW") }}
					<span class="text-[#FF6F4D] font-semibold">{{ t("WITH_YOU") }}</span>
				</p>
			</div>
		</div>

		<div class="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-12 mx-auto max-w-[80rem] mb-24">
			<div
				v-for="item in team"
				:key="item.name"
				class="team-card group cursor-pointer"
				:class="item.isInvite ? 'team-card--invite' : ''"
				@click="item.link ? router.push(item.link) : null"
			>
				<div class="w-full aspect-square overflow-hidden rounded-2xl relative">
					<img
						:src="item.avatar.src"
						format="avif"
						alt="Team"
						class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
					/>
					<div class="team-card__overlay"></div>
				</div>

				<div class="mt-4 text-center">
					<h2 class="font-display font-bold text-[#1C1530] text-lg">{{ item.name }}</h2>
					<h3 class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#8B86A0] mt-1">{{ item.title }}</h3>
				</div>
			</div>
		</div>
	</LandingContainer>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.about-hero {
	position: relative;
	overflow: hidden;
	padding: 5rem 1rem 7rem;
	background: radial-gradient(120% 100% at 50% 0%, #221a44 0%, #14102b 55%, #0f0c20 100%);
}
.hero-glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(60% 50% at 50% 0%, rgba(124, 92, 252, 0.35), transparent 70%);
	pointer-events: none;
}

.about-panel {
	max-width: 56rem;
	margin: 0 auto;
	background: #fffcf7;
	border-radius: 1.5rem;
	padding: 2rem;
	box-shadow: 0 20px 48px -20px rgba(20, 16, 43, 0.35);
}

.team-card {
	transition: transform 0.25s ease;
}
.team-card:hover {
	transform: translateY(-4px);
}

.team-card__overlay {
	position: absolute;
	inset: 0;
	background: linear-gradient(180deg, transparent 60%, rgba(20, 16, 43, 0.35));
	opacity: 0;
	transition: opacity 0.25s ease;
}
.team-card:hover .team-card__overlay {
	opacity: 1;
}

/* The "join the team" card stands out as an open invite */
.team-card--invite .aspect-square {
	border: 2px dashed #c9bdf7;
	background: #f6f3fc;
}
.team-card--invite img {
	opacity: 0.92;
}
.team-card--invite h2 {
	color: #7c5cfc;
}
</style>