<script setup>
definePageMeta({
	layout: "landing",
});

import EventCard from "@/components/EventCard.vue";
import { useEvents } from "@/composables/useEvents";
import { VueDatePicker } from "@vuepic/vue-datepicker";

const { t } = useI18n();

const { events, formatDate } = useEvents();

const sortOrder = ref("desc");
const displayedEvents = computed(() => {
	return [...filteredEvents.value].sort((a, b) =>
		sortOrder.value === "asc"
			? new Date(a.date) - new Date(b.date)
			: new Date(b.date) - new Date(a.date),
	);
});

const categories = [
	{ key: "all", label: t("ALL") },
	{ key: "quiz", label: t("QUIZ") },
	{ key: "kargin", label: t("KARGIN") },
	{ key: "sitcoms", label: t("SITCOMS") },
	{ key: "music", label: t("MUSIC") },
	{ key: "karaoke", label: t("KARAOKE") },
	{ key: "football", label: t("FOOTBALL") },
	{ key: "movie", label: t("MOVIES") },
	{ key: "games", label: t("GAMES") },
];
const selectedCategory = ref("all");
const searchQuery = ref("");
const selectedDate = ref(null);

const filteredEvents = computed(() => {
	return events.value.filter((event) => {
		const selectedCatLabel = categories.find((c) => c.key === selectedCategory.value)?.label;

		const matchesCategory =
			selectedCategory.value === "all" ||
			(Array.isArray(event.category)
				? event.category.includes(selectedCatLabel)
				: event.category === selectedCatLabel);

		const matchesSearch =
			event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			event.description.toLowerCase().includes(searchQuery.value.toLowerCase());

		const matchesDate =
			!selectedDate.value ||
			new Date(event.date).toDateString() === new Date(selectedDate.value).toDateString();

		return event.isUpcoming && matchesCategory && matchesSearch && matchesDate;
	});
});

const placeholder = computed(() => t("SEARCH_WITH"));

const route = useRoute();
useSeoMeta({
	title: t("SEO_UPCOMING_EVENTS_TITLE"),
	description: t("SEO_UPCOMING_EVENTS_DESCRIPTION"),
	ogTitle: t("SEO_UPCOMING_EVENTS_TITLE"),
	ogDescription: t("SEO_UPCOMING_EVENTS_DESCRIPTION"),
	ogUrl: () => `https://www.eventnest.am${route.path}`,
	ogImage: "https://www.eventnest.am/og/eventnest-og.jpg",
	ogImageWidth: 1200,
	ogImageHeight: 630,
	twitterCard: "summary_large_image",
});
useHead({
	link: [{ rel: "canonical", href: () => `https://www.eventnest.am${route.path}` }],
});
</script>

<template>
	<div class="events-page">
		<!-- Hero / search band -->
		<section
			class="hero-band px-4 sm:px-6 pt-32 pb-16 sm:pt-36 sm:pb-20 text-center relative overflow-hidden"
		>
			<div class="hero-glow"></div>
			<div class="relative z-10 max-w-2xl mx-auto">
				<p class="font-mono text-[11px] tracking-[0.35em] text-[#FF6F4D] mb-4 uppercase">
					{{ t("UPCOMING_EVENTS") }}
				</p>
				<h1
					class="font-display text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
				>
					{{ t("FIND_YOUR_EVENT") }}
				</h1>
				<p class="text-[#C7C1E0] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
					{{ t("JOIN_US_AND") }}
				</p>

				<div class="mt-9 flex flex-col items-center gap-3">
					<input
						v-if="t('SEARCH_WITH')"
						v-model="searchQuery"
						type="text"
						:placeholder="`${placeholder}...`"
						class="search-input"
					/>
					<div class="date-picker-wrap">
						<VueDatePicker
							v-model="selectedDate"
							placeholder="MM/DD/YYYY"
							format="MM/dd/yyyy"
							:enable-time-picker="false"
							auto-apply
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Filters -->
		<div class="max-w-6xl mx-auto px-4 sm:px-6">
			<div
				class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 -mt-6 mb-10 relative z-10"
			>
				<div class="flex flex-wrap justify-center md:justify-start gap-2.5">
					<button
						v-for="cat in categories"
						:key="cat.key"
						@click="selectedCategory = cat.key"
						class="filter-pill"
						:class="selectedCategory === cat.key ? 'filter-pill--active' : ''"
					>
						{{ cat.label }}
					</button>
				</div>

				<button
					v-if="filteredEvents.length > 1"
					@click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
					class="sort-btn"
				>
					<span class="font-mono text-[10px] tracking-[0.15em] uppercase opacity-70">{{
						t("SORT_BY")
					}}</span>
					<span class="font-semibold">
						{{
							sortOrder === "asc"
								? t("OLD") + " → " + t("NEW")
								: t("NEW") + " → " + t("OLD")
						}}
					</span>
				</button>
			</div>

			<!-- Results -->
			<div v-if="filteredEvents.length > 0" class="pb-24">
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					<EventCard
						v-for="event in displayedEvents"
						:key="event.id"
						:event="event"
						:formatDate="formatDate"
					/>
				</div>
			</div>

			<section v-else class="py-20 text-center">
				<div class="max-w-md mx-auto">
					<div class="empty-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="font-display text-xl font-bold text-[#1C1530] mt-5">
						{{ t("EVENTS_NOT_FOUND") }}
					</h3>
					<p class="text-[#6B6480] text-sm mt-2">
						{{ t("TRY_TO_CHANGE") }}
					</p>
					<button
						@click="
							selectedCategory = 'all';
							searchQuery = '';
							selectedDate = null;
						"
						class="reset-btn"
					>
						{{ t("RESET_FILTERS") }}
					</button>
				</div>
			</section>
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

.events-page {
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

.search-input {
	width: 100%;
	max-width: 20rem;
	padding: 0.85rem 1.25rem;
	border-radius: 0.85rem;
	border: none;
	background: #ffffff;
	color: #1c1530;
	box-shadow: 0 12px 28px -12px rgba(20, 16, 43, 0.4);
	outline: none;
	font-size: 0.9rem;
}
.search-input::placeholder {
	color: #9d97b8;
}
.search-input:focus {
	box-shadow: 0 0 0 3px rgba(124, 92, 252, 0.4);
}

.date-picker-wrap {
	width: 100%;
	max-width: 13rem;
}

.date-picker-wrap :deep(.dp__input) {
	border-radius: 0.85rem;
	border: none;
	padding: 0.7rem 2.5rem;
	box-shadow: 0 12px 28px -12px rgba(20, 16, 43, 0.4);
	font-size: 0.85rem;
}

/* Filters */
.filter-pill {
	padding: 0.55rem 1.1rem;
	border-radius: 999px;
	font-size: 0.85rem;
	font-weight: 600;
	background: #ffffff;
	color: #4a4360;
	border: 1px solid rgba(28, 21, 48, 0.08);
	box-shadow: 0 6px 16px -10px rgba(20, 16, 43, 0.2);
	transition: all 0.2s ease;
}
.filter-pill:hover {
	border-color: #7c5cfc;
	color: #7c5cfc;
}
.filter-pill--active {
	background: linear-gradient(90deg, #7c5cfc, #6b4ce0);
	border-color: transparent;
	color: #fff;
	box-shadow: 0 10px 22px -10px rgba(124, 92, 252, 0.6);
}



.filter-pill--active:hover {
	color: #fff;
}

.sort-btn {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.1rem;
	padding: 0.55rem 1.1rem;
	border-radius: 0.85rem;
	background: #ffffff;
	color: #1c1530;
	border: 1px solid rgba(28, 21, 48, 0.08);
	box-shadow: 0 6px 16px -10px rgba(20, 16, 43, 0.2);
	white-space: nowrap;
	align-self: center;
}
.sort-btn:hover {
	border-color: #7c5cfc;
}

/* Empty state */
.empty-icon {
	width: 3.25rem;
	height: 3.25rem;
	margin: 0 auto;
	border-radius: 50%;
	background: #efe9ff;
	color: #7c5cfc;
	display: flex;
	align-items: center;
	justify-content: center;
}

.reset-btn {
	margin-top: 1.25rem;
	padding: 0.6rem 1.4rem;
	border-radius: 999px;
	background: linear-gradient(90deg, #7c5cfc, #6b4ce0);
	color: #fff;
	font-weight: 600;
	font-size: 0.85rem;
	box-shadow: 0 10px 22px -10px rgba(124, 92, 252, 0.6);
	transition: transform 0.2s ease;
}
.reset-btn:hover {
	transform: translateY(-1px);
}
</style>
