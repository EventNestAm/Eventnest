<script setup>
import CommingSoon from "~/assets/img/commingSoon.jpg";
import JoinUs from "~/assets/img/joinUs.png";
import MiqoPhoto from "~/assets/img/Miqophoto.jpg";
import Artphoto from "~/assets/img/Artphoto.jpg";
import Davophoto from "~/assets/img/Davophoto.jpg";
import Anahitphoto from "~/assets/img/Anahitphoto.jpg";

definePageMeta({
	layout: "landing",
});

const TeamImg1 = CommingSoon;
const TeamImg2 = CommingSoon;
const TeamImg3 = JoinUs;

const team = [
	{
		name: "Միքայել Գուբրյան",
		title: "CEO & Founder",
		avatar: {
			src: MiqoPhoto,
		},
	},
	{
		name: "Արթուր Դերձյան",
		title: "Creative Director",
		avatar: {
			src: Artphoto,
		},
	},
	{
		name: "Դավիթ Գուբրյան",
		title: "Event Assistant",
		avatar: {
			src: Davophoto,
		},
	},
	{
		name: "Անահիտ Ալոյան",
		title: "Designer",
		avatar: {
			src: Anahitphoto,
		},
	},
	{
		name: "Հենց ԴՈՒ",
		title: "Սպասումենք քո առաջարկին",
		link: "/contact",
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
	<LandingCompanies></LandingCompanies>
	<LandingContainer>
		<div class="mt-10"></div>

		<LandingSectionhead>
			<template v-slot:title>Մեր մասին</template>
			<template v-slot:desc>We are a small passionate team.</template>
		</LandingSectionhead>

		<div class="flex flex-col gap-3 mx-auto mt-4">
			<div class="text-center text-black">
				<p class="text-lg leading-relaxed font-medium max-w-5xl mx-auto">
					Մենք հավատում ենք, որ յուրաքանչյուր պահ կարող է դառնալ հիշարժան։ <strong class="text-purple-600">EventNest</strong>-ը
					ստեղծում է ջերմ, ոգեշնչող մթնոլորտներ՝ որտեղ խաղը միավորում է մարդկանց ու լցնում
					լավ էմոցիաներով։
				</p>

				<p class="text-lg font-medium mt-6">
					Մենք աճում ենք
					<span class="text-purple-600 font-semibold">ձեր հետ և ձեր համար։</span>
				</p>
			</div>
		</div>
		<div
			class="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-x-[13rem] gap-y-10 sm:gap-y-20 mx-auto max-w-[80rem] mt-12"
		>
			<div v-for="item of team" class="group">
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
