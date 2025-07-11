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
			width: 480,
			height: 560,
		},
	},
	{
		name: "Արթուր Դերձյան",
		title: "Creative Director",
		avatar: {
			src: TeamImg2,
			width: 580,
			height: 580,
		},
	},
	{
		name: "Հենց ԴՈՒ",
		title: "Սպասումենք քո առաջարկին",
		avatar: {
			src: TeamImg3,
			width: 580,
			height: 580,
		},
	},
];
</script>

<template>
	<LandingContainer>
		<LandingFeatures></LandingFeatures>
		<div class="mt-10"></div>

		<LandingCompanies></LandingCompanies>
		<div class="mt-10"></div>

		<LandingSectionhead>
			<template v-slot:title>Մեր մասին</template>
			<template v-slot:desc>We are a small passionate team.</template>
		</LandingSectionhead>

		<div class="flex flex-col gap-3 mx-auto max-w-7xl mt-16">
			<h2 class="font-bold text-3xl text-gray-800">Empowering the world with Nuxt.</h2>
			<p class="text-lg leading-relaxed text-slate-500">
				We're a multi-cultural team from around the world! We come from diverse backgrounds,
				bringing different personalities, experiences and skills to the job. This is what
				makes our team so special.
			</p>
		</div>
		<div class="grid md:grid-cols-3 gap-[13rem] mx-auto max-w-[80rem] mt-12">
			<div v-for="item of team" class="group">
				<div class="w-full aspect-square">
					<img
						:src="item.avatar.src"
						:width="item.avatar.width"
						:height="item.avatar.height"
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
