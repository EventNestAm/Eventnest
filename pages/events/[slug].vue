<script setup>
definePageMeta({
	layout: "landing",
});
import EventRegistrationForm from "@/components/EventRegistrationForm.vue";
import { useEvents } from "@/composables/useEvents";
import Calendar from "~/assets/icons/Calendar.vue";
import Clock from "~/assets/icons/Clock.vue";
import Ticket from "~/assets/icons/Ticket.vue";
import Gps from "~/assets/icons/Gps.vue";
import Microphone from "~/assets/icons/Microphone.vue";
import Checked from "~/assets/icons/Checked.vue";
import People from "~/assets/icons/People.vue";
import Heart from "~/assets/icons/Heart.vue";

const route = useRoute();
const router = useRouter();

const eventSlug = route.params.slug;
const { events } = useEvents();
const event = events.value.find((e) => e.slug === eventSlug);
const isSoldOut = event.isSoldout;

const goBack = () => {
	if (window.history.length > 1) {
		router.back();
	} else {
		router.push("/upcoming-events");
	}
};

const { t } = useI18n();

// Faux ticket serial — purely decorative, grounds the "real ticket" motif
const ticketCode = computed(() => {
	const base = (event?.slug || "EVENT").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
	return `EN-${base.padEnd(6, "X")}`;
});

const infoCards = computed(() => [
	{
		icon: Microphone,
		title: t("HOW_ITS_WORK"),
		items: [
			t("HOW_IT_WORKS_FEATURES_FIRST"),
			t("HOW_IT_WORKS_FEATURES_SECOND"),
			t("HOW_IT_WORKS_FEATURES_THIRD"),
		],
	},
	{
		icon: People,
		title: t("FOR_WHOM"),
		items: [
			t("FOR_WHOM_FEATURES_FIRST"),
			t("FOR_WHOM_FEATURES_SECOND"),
			t("FOR_WHOM_FEATURES_THIRD"),
		],
	},
	{
		icon: Heart,
		title: t("WHY_YOU_WILL_LOVE_IT"),
		items: [
			t("WHY_YOU_WILL_LOVE_IT_FEATURES_FIRST"),
			t("WHY_YOU_WILL_LOVE_IT_FEATURES_SECOND"),
			t("WHY_YOU_WILL_LOVE_IT_FEATURES_THIRD"),
		],
	},
]);
</script>

<template>
	<div class="ticket-page">
		<!-- Sold out state -->
		<div class="min-h-[60vh] flex items-center justify-center px-4" v-if="isSoldOut">
			<div
				class="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1530] to-[#120E22] shadow-2xl border border-white/10 text-center max-w-md w-full"
			>
				<p class="font-mono text-[11px] tracking-[0.3em] text-[#FF6F4D] mb-3">{{ ticketCode }}</p>
				<h2 class="font-display text-3xl font-bold text-white mb-4">
					{{ t("SOLD_OUT") }}
				</h2>
				<p class="text-[#B5ADD9] text-sm mb-6">
					{{ t("SOLD_OUT_TEXT") }}
				</p>
				<div class="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>
				<button
					disabled
					class="px-6 py-2 rounded-full bg-white/10 text-white/50 border border-white/10 cursor-not-allowed"
				>
					{{ t("NO_TICKETS") }}
				</button>
			</div>
		</div>

		<!-- Main event content -->
		<div v-if="event && !isSoldOut">
			<!-- Hero band -->
			<section class="hero-band px-4 sm:px-6 pt-16 pb-28 sm:pt-20 sm:pb-36 text-center relative overflow-hidden">
				<div class="hero-glow"></div>
				<div class="relative z-10 max-w-3xl mx-auto">
					<p class="font-mono text-[11px] sm:text-xs tracking-[0.35em] text-[#FF6F4D] mb-4 uppercase">
						{{ event.category || t("EVENT_NOT_FOUND") }} · {{ ticketCode }}
					</p>
					<h1 class="font-display text-[2.25rem] leading-[1.05] sm:text-6xl font-bold text-white my-5 tracking-tight">
						{{ event.title }}
					</h1>
					<p class="text-[#C7C1E0] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
						{{ event.description }}
					</p>

					<div class="flex flex-wrap justify-center gap-2.5 mt-8">
						<span class="meta-pill"><Calendar class="w-4 h-4" />{{ event.dateTitle }}</span>
						<span class="meta-pill"><Clock class="w-4 h-4" />{{ event.time }}</span>
						<span class="meta-pill"><Ticket class="w-4 h-4" />{{ event.price }}</span>
						<span class="meta-pill"><Gps class="w-4 h-4" />{{ event.location }}</span>
					</div>
				</div>
			</section>

			<!-- The ticket: registration form rendered as a real stub, straddling hero/page boundary -->
			<section class="px-4 sm:px-6 -mt-20 sm:-mt-24 relative z-20 mb-20">
				<div class="ticket-stub max-w-md mx-auto">
					<div class="ticket-stub__main">
						<div class="flex items-center justify-between mb-1">
							<span class="font-mono text-[10px] tracking-[0.25em] text-[#8B86A0] uppercase">{{ t("REGISTER") }}</span>
							<span class="font-mono text-[10px] tracking-[0.25em] text-[#8B86A0]">{{ ticketCode }}</span>
						</div>
						<EventRegistrationForm
							:hasGroupName="event.groupName"
							:eventName="event.title"
							:quantity="event.quantity"
						/>
					</div>
					<div class="ticket-stub__perforation" aria-hidden="true"></div>
					<div class="ticket-stub__tail">
						<span class="font-mono text-[10px] tracking-[0.3em] text-[#8B86A0] rotate-90 whitespace-nowrap">
							{{ ticketCode }}
						</span>
					</div>
				</div>
			</section>

			<!-- Info section -->
			<section class="px-4 sm:px-6 pb-24">
				<div class="max-w-5xl mx-auto">
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
						<div
							v-for="card in infoCards"
							:key="card.title"
							class="info-card"
						>
							<div class="flex items-center gap-3 mb-4">
								<span class="info-card__icon"><component :is="card.icon" /></span>
								<p class="font-display font-bold text-[#1C1530] text-lg">{{ card.title }}</p>
							</div>
							<div class="grid gap-3">
								<div v-for="item in card.items" :key="item" class="flex gap-2.5 text-sm text-[#4A4360]">
									<Checked class="shrink-0 mt-0.5 text-[#7C5CFC]" />
									<p>{{ item }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

		<div v-else-if="!isSoldOut" class="text-center py-20 text-gray-500 text-lg">
			{{ t("EVENT_NOT_FOUND") }}
		</div>
	</div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap");

.ticket-page {
	font-family: "Inter", system-ui, sans-serif;
	background: #faf8f4;
}

.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}

.font-mono {
	font-family: "JetBrains Mono", monospace;
}

/* Hero */
.hero-band {
	background: radial-gradient(120% 100% at 50% 0%, #221a44 0%, #14102b 55%, #0f0c20 100%);
}

.hero-glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(60% 50% at 50% 0%, rgba(124, 92, 252, 0.35), transparent 70%);
	pointer-events: none;
}

.meta-pill {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.45rem 0.9rem;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.12);
	color: #e9e6f5;
	font-size: 0.8rem;
	font-weight: 500;
}

/* Ticket stub */
.ticket-stub {
	display: flex;
	background: #fffcf7;
	border-radius: 1.25rem;
	box-shadow: 0 25px 60px -15px rgba(20, 16, 43, 0.45);
	overflow: hidden;
}

.ticket-stub__main {
	flex: 1;
	padding: 1.5rem 1.5rem 1.75rem;
}

.ticket-stub__perforation {
	position: relative;
	width: 0;
	border-left: 2px dashed #e3ddf0;
}

.ticket-stub__perforation::before,
.ticket-stub__perforation::after {
	content: "";
	position: absolute;
	left: -10px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #faf8f4;
}
.ticket-stub__perforation::before {
	top: -10px;
}
.ticket-stub__perforation::after {
	bottom: -10px;
}

.ticket-stub__tail {
	width: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: repeating-linear-gradient(
		135deg,
		#7c5cfc,
		#7c5cfc 6px,
		#6b4ce0 6px,
		#6b4ce0 12px
	);
}

/* Info cards */
.info-card {
	background: #ffffff;
	border: 1px solid rgba(28, 21, 48, 0.06);
	border-radius: 1.25rem;
	padding: 1.5rem;
	transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.info-card:hover {
	transform: translateY(-3px);
	box-shadow: 0 16px 32px -12px rgba(28, 21, 48, 0.18);
}
.info-card__icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 0.75rem;
	background: #efe9ff;
	color: #7c5cfc;
}

@media (max-width: 480px) {
	.ticket-stub {
		flex-direction: column;
	}
	.ticket-stub__perforation {
		width: auto;
		height: 0;
		border-left: none;
		border-top: 2px dashed #e3ddf0;
	}
	.ticket-stub__perforation::before,
	.ticket-stub__perforation::after {
		top: -10px;
		left: auto;
	}
	.ticket-stub__perforation::before {
		left: -10px;
	}
	.ticket-stub__perforation::after {
		right: -10px;
		left: auto;
	}
	.ticket-stub__tail {
		width: 100%;
		height: 32px;
	}
	.ticket-stub__tail span {
		transform: none;
	}
}
</style>