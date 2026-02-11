<script setup>
import JoinUs from "~/assets/img/joinUs.png";
import MiqoPhoto from "~/assets/img/Miqophoto.jpg";
import Artphoto from "~/assets/img/Artphoto.jpg";
import Davophoto from "~/assets/img/Davophoto.jpg";
import Anahitphoto from "~/assets/img/Anahitphoto.jpg";
import Asyaphoto from "~/assets/img/Asyaphoto.jpg";

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
		avatar: {
			src: MiqoPhoto,
		},
	},
	{
		name: "Արթուր Դերձյան",
		title: t("CREATIVE_DIRECTOR"),
		avatar: {
			src: Artphoto,
		},
	},
	{
		name: "Դավիթ Գուբրյան",
		title: t("EVENTS_SPECIALIST"),
		avatar: {
			src: Davophoto,
		},
	},
	{
		name: "Ասյա Գագինյան",
		title: t("PHOTOGRAPHER"),
		avatar: {
			src: Asyaphoto,
		},
	},
	{
		name: "Անահիտ Ալոյան",
		title: t("DESIGNER"),
		avatar: {
			src: Anahitphoto,
		},
	},
	{
		name: t("ITS_YOU"),
		title: t("WAITING_FOR_YOU"),
		link: localePath("/contact"),
		avatar: {
			src: TeamImg3,
		},
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
	<LandingContainer>
		<div class="mt-10"></div>
		<LandingSectionhead>
			<template v-slot:title>{{ t("ABOUT_US") }}</template>
			<template v-slot:desc>We are a small passionate team.</template>
		</LandingSectionhead>

		<div class="flex flex-col gap-3 mx-auto mt-4">
			<div class="text-center text-black">
				<p class="text-lg leading-relaxed font-medium max-w-5xl mx-auto">
					{{ t("WE_BELIEVE") }}
					<strong class="text-purple-600">EventNest</strong> {{ t("WE_BELIEVE_SECOND") }}
				</p>

				<p class="text-lg font-medium mt-6">
					{{ t("WE_GROW") }}
					<span class="text-purple-600 font-semibold">{{ t("WITH_YOU") }}</span>
				</p>
			</div>
		</div>
		<div
			class="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-x-[13rem] gap-y-10 sm:gap-y-20 mx-auto max-w-[80rem] mt-12"
		>
			<div
				v-for="item in team"
				:key="item.name"
				class="group cursor-pointer"
				@click="item.link ? router.push(item.link) : null"
			>
				<div class="w-full aspect-square">
					<img
						:src="item.avatar.src"
						format="avif"
						alt="Team"
						class="w-full h-full md:h-[14rem] lg:h-[20rem] object-cover rounded-lg transition group-hover:-translate-y-1 group-hover:shadow-xl"
					/>
				</div>

				<div class="mt-4 text-center">
					<h2 class="text-lg text-gray-800">{{ item.name }}</h2>
					<h3 class="text-sm text-slate-500">{{ item.title }}</h3>
				</div>
			</div>
		</div>
	</LandingContainer>
</template>
