<script setup>
import { ref, onMounted } from "vue";

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
	<div class="flex gap-6 mt-8 flex-wrap">
		<div
			class="flex flex-col items-center bg-orange-50 p-5 rounded-2xl shadow hover:scale-105 transition-transform card"
		>
			<div class="text-3xl mb-1">🎉</div>
			<p class="text-4xl font-bold text-[#00308F]">{{ eventsCount }}+</p>
			<p class="text-sm text-gray-700 text-center">միջոցառումներ կազմակերպված</p>
		</div>

		<div
			class="flex flex-col items-center bg-orange-50 p-5 rounded-2xl shadow hover:scale-105 transition-transform card"
		>
			<div class="text-3xl mb-1">😊</div>
			<p class="text-4xl font-bold text-[#00308F]">{{ participantsCount }}+</p>
			<p class="text-sm text-gray-700 text-center">ուրախ մասնակիցներ</p>
		</div>
	</div>
</template>
<style>
.card {
	background: linear-gradient(180deg, #fff7ed, #ffffff);
	border-radius: 20px;
}
</style>
