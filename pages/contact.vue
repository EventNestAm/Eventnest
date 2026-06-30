<script setup>
definePageMeta({
	layout: "landing",
});
const { t } = useI18n();
</script>

<template>
	<div class="contact-page">
		<section class="hero-band px-4 sm:px-6 pt-32 pb-20 sm:pt-36 sm:pb-24 text-center relative overflow-hidden">
			<div class="hero-glow"></div>
			<div class="relative z-10 max-w-2xl mx-auto">
				<p class="font-mono text-[11px] tracking-[0.35em] text-[#FF6F4D] mb-4 uppercase">
					{{ t("WE_ANSWER") }}
				</p>
				<h1 class="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
					{{ t("CONTACT_US") }}
				</h1>
			</div>
		</section>

		<LandingContainer>
			<div class="grid md:grid-cols-2 gap-10 mx-auto max-w-6xl -mt-10 sm:-mt-12 relative z-10 pb-24">
				<!-- Info column -->
				<div class="info-panel">
					<p class="text-base leading-relaxed text-[#4A4360]">
						{{ t("CONTACT_TEXT") }}
					</p>
					<ul class="mt-6 space-y-3">
						<li class="info-item">
							<span class="info-dot"></span>
							{{ t("CORPORATE_TEAM") }}
						</li>
						<li class="info-item">
							<span class="info-dot"></span>
							{{ t("QUIZES_FUN") }}
						</li>
						<li class="info-item">
							<span class="info-dot"></span>
							{{ t("BRANDED_EVENTS") }}
						</li>
						<li class="info-item">
							<span class="info-dot"></span>
							{{ t("ORGANIZING_FAMILY") }}
						</li>
					</ul>
					<div class="mt-8">
						<PersonCounts />
					</div>
				</div>

				<!-- Ticket-stub form column -->
				<div class="ticket-stub">
					<div class="ticket-stub__main">
						<div class="flex items-center justify-between mb-4">
							<span class="font-mono text-[10px] tracking-[0.25em] text-[#8B86A0] uppercase">{{ t("CONTACT_US") }}</span>
						</div>

						<LandingContactform />

						<p class="text-xs text-[#8B86A0] mt-4 flex justify-end">
							{{ t("WE_ANSWER") }}
						</p>
					</div>

					<div class="ticket-stub__perforation" aria-hidden="true"></div>

					<div class="ticket-stub__tail">
						<div class="flex flex-col gap-4">
							<a class="contact-pill" href="mailto:eventnest.am@gmail.com">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<rect x="2.5" y="5" width="19" height="14" rx="3" />
									<path d="M3.5 6.5l8.5 6 8.5-6" />
								</svg>
								<span>eventnest.am@gmail.com</span>
							</a>
							<a class="contact-pill" href="tel:+37496000099">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M5 4.5h4l1.5 4-2.5 2.5a14 14 0 006 6l2.5-2.5 4 1.5v4c0 1-1 2-2 2C9 22 2 15 2 6c0-1 1-2 2-2z" />
								</svg>
								<span>+374 96 00 00 99</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</LandingContainer>
	</div>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.contact-page {
	background: #faf8f4;
	min-height: 100vh;
}

.hero-band {
	background: radial-gradient(120% 100% at 50% 0%, #221a44 0%, #14102b 55%, #0f0c20 100%);
}
.hero-glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(60% 50% at 50% 0%, rgba(124, 92, 252, 0.35), transparent 70%);
	pointer-events: none;
}

/* Info column */
.info-panel {
	background: #fffcf7;
	border-radius: 1.25rem;
	padding: 1.75rem;
	box-shadow: 0 16px 36px -18px rgba(20, 16, 43, 0.3);
}

.info-item {
	display: flex;
	align-items: center;
	gap: 0.65rem;
	font-size: 1rem;
	color: #1c1530;
	font-weight: 500;
}

.info-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #ff6f4d;
	flex-shrink: 0;
}

/* Ticket stub (form) */
.ticket-stub {
	display: flex;
	flex-direction: column;
	background: #fffcf7;
	border-radius: 1.25rem;
	box-shadow: 0 25px 60px -18px rgba(20, 16, 43, 0.4);
	overflow: hidden;
}

.ticket-stub__main {
	padding: 1.75rem;
}

.ticket-stub__perforation {
	position: relative;
	height: 0;
	border-top: 2px dashed #e3ddf0;
	margin: 0 1.75rem;
}
.ticket-stub__perforation::before,
.ticket-stub__perforation::after {
	content: "";
	position: absolute;
	top: -10px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #faf8f4;
}
.ticket-stub__perforation::before {
	left: -1.75rem;
}
.ticket-stub__perforation::after {
	right: -1.75rem;
}

.ticket-stub__tail {
	padding: 1.5rem 1.75rem;
}

.contact-pill {
	display: inline-flex;
	align-items: center;
	gap: 0.6rem;
	color: #4a4360;
	font-size: 0.9rem;
	font-weight: 500;
	transition: color 0.2s ease, transform 0.2s ease;
}
.contact-pill:hover {
	color: #7c5cfc;
	transform: translateX(3px);
}
</style>