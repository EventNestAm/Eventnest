<script setup>
import { Analytics } from "@vercel/analytics/nuxt";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();

useSeoMeta({
	title: "EventNest — Fun, Smart & Social Events",
	description: "Join our quizzes, mafia games, and win great prizes!",
	ogTitle: "EventNest Armenia",
	ogDescription: "Fun and smart games with cool gifts!",
	ogImage: "/eventnestLogo.jpg",
	ogUrl: "https://eventnest.am",
	twitterCard: "summary_large_image",
});

const showScroll = ref(false);

const checkScroll = () => {
	showScroll.value = window.scrollY > 300;
};

onMounted(() => {
	window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
	window.removeEventListener("scroll", checkScroll);
});

const goTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
	<NuxtLayout>
		<div class="min-h-screen">
			<NuxtPage />

			<transition
				enter-active-class="transition duration-500 ease-out"
				enter-from-class="opacity-0 translate-y-5 scale-90"
				enter-to-class="opacity-100 translate-y-0 scale-100"
				leave-active-class="transition duration-300 ease-in"
				leave-from-class="opacity-100 translate-y-0 scale-100"
				leave-to-class="opacity-0 translate-y-5 scale-90"
			>
				<div v-if="showScroll" class="fixed bottom-6 right-6 z-50">
					<button
						@click.prevent="goTop"
						class="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-indigo-500/50 transition-all duration-500 transform hover:-translate-y-2 active:scale-95"
					>
						<span
							class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 opacity-60 blur-md group-hover:opacity-100 transition-all duration-500"
						></span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.3"
							stroke="white"
							class="relative w-7 h-7 group-hover:-translate-y-1 transition-transform duration-300"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5 15l7-7 7 7"
							/>
						</svg>
					</button>
				</div>
			</transition>
		</div>
	</NuxtLayout>
</template>
