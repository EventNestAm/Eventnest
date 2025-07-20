<script setup>
import CommingSoon from "~/assets/img/commingSoon.jpg";
import JoinUs from "~/assets/img/joinUs.png";

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
			src: TeamImg1,
		},
	},
	{
		name: "Արթուր Դերձյան",
		title: "Creative Director",
		avatar: {
			src: TeamImg2,
		},
	},
	{
		name: "Անահիտ Ալոյան",
		title: "Designer",
		avatar: {
			src: TeamImg1,
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

		<LandingCompanies></LandingCompanies>
		<div class="mt-10"></div>

		<LandingSectionhead>
			<template v-slot:title>Մեր մասին</template>
			<template v-slot:desc>We are a small passionate team.</template>
		</LandingSectionhead>

		<div class="flex flex-col gap-3 mx-auto max-w-7xl mt-16">
			<p class="text-lg leading-relaxed text-slate-500">
				Մենք փոքր, բայց մեծ երազանքներով թիմ ենք։ EventNest-ում մենք հավատում ենք, որ
				յուրաքանչյուր պահ կարող է դառնալ անմոռանալի։ Մեր նպատակը պարզ է՝ ստեղծել դրական,
				ջերմ ու ոգեշնչող մթնոլորտներ, որոնք մարդկանց կմիավորեն ու կլցնեն լավ еմոցիաներով։
				Մենք դեռ փոքր ենք, բայց մեծ քայլերով գնում ենք դեպի մեծանալը՝ ձեր հետ ու ձեր համար։
			</p>
		</div>
		<div
			class="grid md:grid-cols-3 gap-x-10 md:gap-x-[13rem] gap-y-20 mx-auto max-w-[80rem] mt-12"
		>
			<div v-for="item of team" class="group">
				<div class="w-full aspect-square">
					<img
						:src="item.avatar.src"
						format="avif"
						alt="Team"
						class="w-full h-full object-cover rounded-lg transition group-hover:-translate-y-1 group-hover:shadow-xl"
					/>
				</div>

				<div class="mt-4 text-center">
					<h2 class="text-lg text-gray-800">{{ item.name }}</h2>
					<h3 class="text-sm text-slate-500">{{ item.title }}</h3>
				</div>
			</div>

			<!-- <div class="group">
            <div class="w-full aspect-square">
              <Image
                {...item.avatar}
                format="avif"
                alt="Team"
                class="w-full h-full object-cover rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
              />
            </div>

            <div class="mt-4 text-center">
              <h2 class="text-lg text-gray-800"> {item.name}</h2>
              <h3 class="text-sm text-slate-500"> {item.title}</h3>
            </div>
          </div> -->
		</div>
	</LandingContainer>
</template>
