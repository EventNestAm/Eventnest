<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
	<main class="hero">
		<div class="hero-glow"></div>

		<div
			class="relative z-10 grid lg:grid-cols-2 place-items-center gap-10 pb-16 pt-32 sm:pt-28 lg:pt-16 px-4 sm:px-6 max-w-6xl mx-auto"
		>
			<div class="order-2 lg:order-1 text-center lg:text-left">
				<p class="font-mono text-[11px] tracking-[0.35em] text-[#FF6F4D] mb-4 uppercase">
					{{ t("WE_GROW") }} {{ t("WITH_YOU") }}
				</p>

				<h1
					class="font-display text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white"
				>
					EventNest
				</h1>

				<p
					class="text-base sm:text-lg mt-5 text-[#C7C1E0] max-w-xl font-medium uppercase tracking-wide"
				>
					EventNest – <span class="text-[#FF6F4D] font-bold">Remember</span>
					<span class="ml-1 text-[#C7C1E0]">you are the</span>
					<span class="ml-1 text-[#FF6F4D] font-bold">Best</span>
				</p>

				<div class="mt-8">
					<LandingLink :to="localePath('/contact')" class="hero-cta">
						{{ t("JOIN_US") }}
					</LandingLink>
				</div>
			</div>

			<div class="order-1 lg:order-2 relative">
				<div class="hero-photo-ring">
					<img
						class="hero-photo"
						src="~/assets/img/ourPicture.jpg"
						alt="միջոցառումների կազմակերպում EventNest"
						loading="eager"
						width="512"
						height="512"
						fetchpriority="high"
					/>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.hero {
	position: relative;
	width: 100%;
	overflow: hidden;
	background: radial-gradient(120% 100% at 50% 0%, #221a44 0%, #14102b 55%, #0f0c20 100%);
}

.hero-glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(55% 50% at 80% 10%, rgba(124, 92, 252, 0.3), transparent 70%);
	pointer-events: none;
}

.hero-photo-ring {
	position: relative;
	width: 14rem;
	height: 14rem;
	border-radius: 50%;
	padding: 6px;
	background: conic-gradient(from 180deg, #7c5cfc, #ff6f4d, #7c5cfc);
	transition: transform 0.4s ease;
}

@media (min-width: 768px) {
	.hero-photo-ring {
		width: 20rem;
		height: 20rem;
	}
}

.hero-photo-ring:hover {
	transform: scale(1.04);
}

.hero-photo {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
	display: block;
	border: 4px solid #14102b;
}

.hero-badge {
	position: absolute;
	bottom: 0.5rem;
	right: -0.25rem;
	background: #fffcf7;
	color: #1c1530;
	font-size: 0.65rem;
	letter-spacing: 0.15em;
	padding: 0.4rem 0.7rem;
	border-radius: 999px;
	box-shadow: 0 10px 22px -8px rgba(20, 16, 43, 0.5);
}

.hero-cta {
	display: inline-flex;
}
</style>
