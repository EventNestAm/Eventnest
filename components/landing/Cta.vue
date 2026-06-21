<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
	<div class="cta-band">
		<div class="cta-glow"></div>
		<div class="cta-notch cta-notch--left" aria-hidden="true"></div>
		<div class="cta-notch cta-notch--right" aria-hidden="true"></div>

		<div class="relative z-10 flex flex-col items-center text-center px-6 sm:px-12 py-16 sm:py-20">
			<p class="font-mono text-[11px] tracking-[0.35em] text-[#FF6F4D] mb-4 uppercase">EN-CTA</p>
			<h2 class="font-display text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight text-white max-w-2xl">
				{{ t("YOUR_EVENT") }}
			</h2>

			<div class="flex mt-8 sm:mt-10">
				<LandingLink
					class="cta-link"
					size="lg"
					styleName="outline"
					rel="noopener"
					:to="localePath('/contact')"
					target=""
					>{{ t("JOIN_US") }}</LandingLink
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.cta-band {
	position: relative;
	overflow: hidden;
	margin: 5rem auto;
	max-width: 64rem;
	border-radius: 1.75rem;
	background: radial-gradient(120% 140% at 50% 0%, #221a44 0%, #14102b 60%, #0f0c20 100%);
	box-shadow: 0 30px 70px -24px rgba(20, 16, 43, 0.5);
}

.cta-glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(60% 60% at 50% 0%, rgba(124, 92, 252, 0.35), transparent 70%);
	pointer-events: none;
}

/* Ticket notches on the long edges, framing the CTA like a stub */
.cta-notch {
	position: absolute;
	top: 50%;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #faf8f4;
	transform: translateY(-50%);
	z-index: 2;
}
.cta-notch--left {
	left: -12px;
}
.cta-notch--right {
	right: -12px;
}

.cta-link {
	border-radius: 999px !important;
	background: transparent !important;
	border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
	color: #fff !important;
	font-weight: 700;
	padding-left: 2rem;
	padding-right: 2rem;
	transition: all 0.25s ease;
}
.cta-link:hover {
	background: linear-gradient(90deg, #7c5cfc, #6b4ce0) !important;
	border-color: transparent !important;
	transform: translateY(-2px);
	box-shadow: 0 14px 30px -10px rgba(124, 92, 252, 0.55);
}
</style>