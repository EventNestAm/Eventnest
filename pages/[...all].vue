<script setup>
// Real HTTP 404 for unmatched routes — without this, every broken/unknown
// URL returns status 200 with "page not found" content, which search
// engines treat as a soft 404 and may index as real, thin content.
setResponseStatus(404);
useSeoMeta({
	title: "404 — Page not found | EventNest",
	robots: "noindex, follow",
});
</script>


<template>
	<div
		class="min-h-screen relative flex flex-col items-center justify-center bg-[#e0ebff] text-center px-6 overflow-hidden"
	>
		<div
			class="circle animate-pulse bg-[#00308f] opacity-30 absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		></div>
		<div
			class="circle animate-ping bg-[#00308f] opacity-20 absolute -z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		></div>

		<h1 class="text-6xl md:text-8xl font-extrabold text-[#00308f] mb-6">404</h1>
		<h2 class="text-2xl md:text-4xl font-semibold text-[#00308f]/90 mb-4">
			Oops! Page not found
		</h2>
		<p class="text-[#00308f]/70 mb-8 max-w-md">
			The page you are looking for does not exist, or has been moved. Don’t worry, you can go
			back to the homepage and continue exploring Eventnest.
		</p>

		<NuxtLink
			to="/"
			class="px-6 py-3 bg-[#00308f] text-white font-semibold rounded-xl hover:bg-[#002060] transition-all duration-300 shadow-lg mt-10"
		>
			Go to Homepage
		</NuxtLink>
	</div>
</template>

<style scoped>
.circle {
	width: 400px;
	height: 400px;
	border-radius: 50%;
}

.animate-pulse {
	animation: pulse 6s infinite ease-in-out;
}

.animate-ping {
	animation: ping 8s infinite ease-in-out;
}

@keyframes pulse {
	0%,
	100% {
		transform: scale(0.8);
		opacity: 0.3;
	}
	50% {
		transform: scale(1.2);
		opacity: 0.4;
	}
}

@keyframes ping {
	0% {
		transform: scale(0.8);
		opacity: 0.2;
	}
	50% {
		transform: scale(1.5);
		opacity: 0.1;
	}
	100% {
		transform: scale(0.8);
		opacity: 0.2;
	}
}
</style>
