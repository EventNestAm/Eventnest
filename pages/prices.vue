<script setup>
const { t } = useI18n();
const route = useRoute();

useSeoMeta({
	title: "Prices | EventNest",
	description: "See prices for EventNest quizzes, karaoke battles, teambuilding, corporate events, gift cards and membership cards in Yerevan.",
	ogTitle: "Prices | EventNest",
	ogDescription: "See prices for EventNest quizzes, karaoke battles, teambuilding, corporate events, gift cards and membership cards in Yerevan.",
	ogUrl: () => `https://www.eventnest.am${route.path}`,
});

useHead({
	link: [{ rel: "canonical", href: () => `https://www.eventnest.am${route.path}` }],
});

/**
 * TODO: replace placeholder names/prices/descriptions with the real values.
 * `price` is a plain string so you can format currency however you like (e.g. "15 000 ֏", "$40").
 * `unit` is optional small text after the price (e.g. "/ person", "/ team").
 * `icon` refers to the icon key rendered by <PriceIcon :name="item.icon" /> below.
 */
const items = ref([
	{
		id: "gift-card",
		icon: "gift",
		title: t("GIFT_CARD"),
		price: "3 000 ֏",
		unit: t("PER_PERSON"),
		description: t("GIFT_CARD_DESC"),
	},
	{
		id: "teambuilding",
		icon: "team",
		title: t("TEAMBUILDING"),
		price: "100 000 ֏ +",
		unit: t("PER_TEAM"),
		description: t("TEAMBUILDING_DESC"),
	},
	{
		id: "quiz",
		icon: "quiz",
		title: t("QUIZ"),
		price: "3 000 ֏",
		unit: t("PER_PERSON"),
		description: t("QUIZ_DESC"),
	},
	{
		id: "karaoke",
		icon: "mic",
		title: t("KARAOKE_BATTLE_TITLE"),
		price: "4 000 ֏",
		unit: t("PER_PERSON"),
		description: t("KARAOKE_BATTLE_DESC"),
	},
	{
		id: "membership",
		icon: "card",
		title: t("MEMBERSHIP_CARD"),
		price: "50 000 ֏",
		unit: t("PER_YEAR"),
		description: t("MEMBERSHIP_CARD_DESC"),
	},
]);

definePageMeta({
	layout: "landing",
});
</script>

<template>
	<section class="pricing">
		<h1 class="pricing__title">{{ t("PRICING_TITLE") }}</h1>
		<p class="pricing__subtitle">{{ t("PRICING_SUBTITLE") }}</p>

		<div class="pricing__grid">
			<div v-for="item in items" :key="item.id" class="price-card">
				<div class="price-card__icon-wrap">
					<!-- Gift card -->
					<svg
						v-if="item.icon === 'gift'"
						viewBox="0 0 24 24"
						class="price-card__icon"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="3" y="8" width="18" height="4" rx="1" />
						<rect x="4" y="12" width="16" height="9" rx="1" />
						<path d="M12 8v13" />
						<path d="M12 8c-1.5-3-3-4-4.5-4C6 4 5 5 5 6.5S6 8 7.5 8" />
						<path d="M12 8c1.5-3 3-4 4.5-4C18 4 19 5 19 6.5S18 8 16.5 8" />
					</svg>
					<!-- Teambuilding -->
					<svg
						v-else-if="item.icon === 'team'"
						viewBox="0 0 24 24"
						class="price-card__icon"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="8" cy="8" r="2.7" />
						<circle cx="16" cy="8" r="2.7" />
						<path d="M3 20c0-3 2.2-5 5-5s5 2 5 5" />
						<path d="M11 20c0-3 2.2-5 5-5s5 2 5 5" />
					</svg>
					<!-- Quiz -->
					<svg
						v-else-if="item.icon === 'quiz'"
						viewBox="0 0 24 24"
						class="price-card__icon"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="9" />
						<path d="M9.2 9.3a2.8 2.8 0 0 1 5.4 1c0 1.8-2.6 2-2.6 3.8" />
						<circle cx="12" cy="17" r="0.15" fill="currentColor" stroke="none" />
					</svg>
					<!-- Karaoke mic -->
					<svg
						v-else-if="item.icon === 'mic'"
						viewBox="0 0 24 24"
						class="price-card__icon"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="9" y="2.5" width="6" height="11" rx="3" />
						<path d="M6 11a6 6 0 0 0 12 0" />
						<path d="M12 17v4" />
						<path d="M8.5 21h7" />
					</svg>
					<!-- Membership card -->
					<svg
						v-else-if="item.icon === 'card'"
						viewBox="0 0 24 24"
						class="price-card__icon"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="2.5" y="5.5" width="19" height="13" rx="2" />
						<path d="M2.5 9.5h19" />
						<path d="M6 14.5h5" />
					</svg>
				</div>

				<h2 class="price-card__title">{{ item.title }}</h2>
				<p class="price-card__desc">{{ item.description }}</p>
				<div class="price-card__price">
					{{ item.price }}
					<span v-if="item.unit" class="price-card__unit">{{ item.unit }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.pricing {
	max-width: 1200px;
	margin: 0 auto;
	padding: 6rem 1.25rem;
}

.pricing__eyebrow {
	font-family: "JetBrains Mono", monospace;
	font-size: 10px;
	letter-spacing: 0.3em;
	text-transform: uppercase;
	color: #8b86a0;
	text-align: center;
	margin-bottom: 0.5rem;
}

.pricing__title {
	font-family: "Space Grotesk", system-ui, sans-serif;
	font-size: 2rem;
	font-weight: 700;
	color: #1c1530;
	text-align: center;
	margin-bottom: 0.5rem;
}

.pricing__subtitle {
	font-size: 0.95rem;
	color: #8b86a0;
	text-align: center;
	max-width: 520px;
	margin: 0 auto 2.5rem;
}

.pricing__grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.25rem;
	align-items: stretch;
}

.price-card {
	background: #f6f3fc;
	border: 1.5px solid transparent;
	border-radius: 1rem;
	padding: 1.5rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	transition:
		border-color 0.2s ease,
		transform 0.2s ease;
}

.price-card:hover {
	border-color: #7c5cfc;
	transform: translateY(-2px);
}

.price-card__icon-wrap {
	width: 44px;
	height: 44px;
	margin: 0 auto 0.75rem;
	border-radius: 50%;
	background: #ece7fb;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.price-card__icon {
	width: 22px;
	height: 22px;
	color: #7c5cfc;
}

.price-card__title {
	font-family: "Space Grotesk", system-ui, sans-serif;
	font-size: 1rem;
	font-weight: 600;
	color: #1c1530;
	margin: 0 0 0.4rem;
}

.price-card__desc {
	font-size: 0.82rem;
	color: #8b86a0;
	line-height: 1.5;
	margin: 0 0 1rem;
	flex-grow: 1;
}

.price-card__price {
	font-family: "JetBrains Mono", monospace;
	font-size: 1.15rem;
	font-weight: 600;
	color: #fff;
	background: linear-gradient(90deg, #7c5cfc, #6b4ce0);
	border-radius: 999px;
	padding: 0.5rem 1rem;
	display: inline-flex;
	align-items: baseline;
	gap: 0.3rem;
	margin-top: auto;
	align-self: center;
}

.price-card__unit {
	font-size: 0.7rem;
	font-weight: 500;
	opacity: 0.85;
}
</style>