<script setup>
import { ref, onMounted } from "vue";
const { t } = useI18n();
function useCountUp(target, duration = 1500) {
	const display = ref(0);
	onMounted(() => {
		let start = 0;
		const increment = target / (duration / 16);
		const step = () => {
			start += increment;
			if (start >= target) {
				display.value = target;
			} else {
				display.value = Math.floor(start);
				requestAnimationFrame(step);
			}
		};
		step();
	});
	return display;
}

const eventsCount = useCountUp(50);
const participantsCount = useCountUp(2000);
</script>

<template>
	<div class="flex gap-6 mt-8 flex-wrap justify-center sm:justify-normal">
		<div class="card flex flex-col items-center p-6 transition hover:scale-[1.03]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="w-6 h-6 mb-2 text-orange-500"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M3 12l2-2 4 4 8-8 4 4" />
				<circle cx="12" cy="12" r="10" />
			</svg>

			<p class="text-4xl font-semibold text-[#00308F]">{{ eventsCount }}+</p>
			<p class="text-sm text-gray-600 text-center">{{ t("ORGANIZED_EVENTS") }}</p>
		</div>

		<div class="card flex flex-col items-center p-6 transition hover:scale-[1.03]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="w-6 h-6 mb-2 text-orange-500"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="8" r="4" />
				<path d="M4 20c1.5-4 14.5-4 16 0" />
			</svg>

			<p class="text-4xl font-semibold text-[#00308F]">{{ participantsCount }}+</p>
			<p class="text-sm text-gray-600 text-center">{{ t("ORGANIZED_EVENTS") }}</p>
		</div>
	</div>
</template>
<style>
.card {
	background: linear-gradient(180deg, #fff7ed, #ffffff);
	border-radius: 20px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}
</style>
