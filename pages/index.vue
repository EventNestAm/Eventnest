<script setup>
definePageMeta({
	layout: "landing",
});
import { useEvents } from "@/composables/useEvents";
import EventCard from "@/components/EventCard.vue";
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const { filteredEvents, formatDate, newFilteredEvents } = useEvents();

const modules = [Navigation, Pagination, Autoplay];
const route = useRoute();
const config = useRuntimeConfig();
const siteUrl = "https://www.eventnest.am";

// ---- OG locale map (BCP47 -> OG locale format, e.g. "hy" -> "hy_AM") ----
const ogLocaleMap = {
	hy: "hy_AM",
	en: "en_US",
	ru: "ru_RU",
};

useSeoMeta({
	title: t("SEO_HOME_TITLE"),
	description: t("SEO_HOME_DESCRIPTION"),
	ogTitle: t("SEO_HOME_TITLE"),
	ogDescription: t("SEO_HOME_DESCRIPTION"),
	ogUrl: () => `${siteUrl}${route.path}`,
	ogType: "website",
	ogLocale: () => ogLocaleMap[locale.value] || "en_US",
	ogImage: `${siteUrl}/og/eventnest-og.jpg`,
	ogImageWidth: 1200,
	ogImageHeight: 630,
	twitterCard: "summary_large_image",
	twitterTitle: t("SEO_HOME_TITLE"),
	twitterDescription: t("SEO_HOME_DESCRIPTION"),
	twitterImage: `${siteUrl}/og/eventnest-og.jpg`,
});

// ---- Canonical + hreflang alternates ----
const canonicalUrl = computed(() => `${siteUrl}${route.path}`);
const hreflangLinks = computed(() =>
	(locales.value || []).map((l) => ({
		rel: "alternate",
		hreflang: l.iso || l.code,
		href: `${siteUrl}${switchLocalePath(l.code)}`,
	}))
);

// ---- Event structured data (schema.org Event) for the featured/upcoming events ----
const eventJsonLd = computed(() =>
	newFilteredEvents.value.map((event) => ({
		"@context": "https://schema.org",
		"@type": "Event",
		name: event.title,
		startDate: event.date && event.time ? `${event.date}T${event.time}` : event.date,
		eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
		eventStatus: event.isSoldout
			? "https://schema.org/EventMovedOnline" // placeholder; see note below
			: "https://schema.org/EventScheduled",
		location: {
			"@type": "Place",
			name: event.location,
			address: event.location,
		},
		image: event.image ? [event.image] : undefined,
		description: event.description,
		offers: event.price
			? {
					"@type": "Offer",
					price: String(event.price).replace(/[^\d.]/g, ""),
					priceCurrency: "AMD",
					availability: event.isSoldout
						? "https://schema.org/SoldOut"
						: "https://schema.org/InStock",
					url: `${siteUrl}${localePath(`/events/${event.slug}`)}`,
				}
			: undefined,
		url: `${siteUrl}${localePath(`/events/${event.slug}`)}`,
	}))
);

useHead({
	link: [
		{ rel: "canonical", href: canonicalUrl },
		...hreflangLinks.value,
	],
	script: [
		{
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "EventNest",
				url: siteUrl,
				logo: `${siteUrl}/eventnestLogo.png`,
				sameAs: [
					"https://www.instagram.com/eventnest.am/",
					"https://www.facebook.com/p/Eventnestam-61573604121906/",
				],
			}),
		},
		{
			type: "application/ld+json",
			innerHTML: () => JSON.stringify(eventJsonLd.value),
		},
	],
});
</script>

<template>
	<LandingHero />
	<LandingContainer>
		<LandingFeatures />
	</LandingContainer>

	<div v-if="filteredEvents.length > 0" class="events-swiper-wrap">
		<!--
			Always-rendered, crawlable link list. This exists purely so crawlers
			(and any client that doesn't execute JS) have real <a> hrefs to every
			event page in the initial HTML, independent of the Swiper/ClientOnly
			below. Visually hidden but present in the DOM.
		-->
		<nav class="sr-only-events" aria-label="Upcoming events">
			<ul>
				<li v-for="event in newFilteredEvents" :key="event.id">
					<NuxtLink :to="localePath(`/events/${event.slug}`)">
						{{ event.title }} — {{ formatDate(event.date) }}
					</NuxtLink>
				</li>
			</ul>
		</nav>

		<ClientOnly>
			<Swiper
				:modules="modules"
				:space-between="18"
				:slides-per-view="1.2"
				:centered-slides="newFilteredEvents.length === 1"
				:centered-slides-bounds="true"
				:loop="newFilteredEvents.length > 1"
				:speed="500"
				:grabCursor="true"
				:autoplay="
					newFilteredEvents.length > 1
						? { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }
						: false
				"
				:pagination="{ clickable: true, dynamicBullets: true }"
				:navigation="true"
				:breakpoints="{
					501: { slidesPerView: 1.6, centeredSlides: false, spaceBetween: 18 },
					768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
					1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 22 },
				}"
				class="events-swiper"
			>
				<SwiperSlide v-for="event in newFilteredEvents" :key="event.id">
					<EventCard :event="event" :formatDate="formatDate" class="w-full" />
				</SwiperSlide>
			</Swiper>

			<!-- Server-rendered / pre-hydration fallback: plain visual list, still real links -->
			<template #fallback>
				<ul class="events-fallback-list">
					<li v-for="event in newFilteredEvents" :key="event.id">
						<NuxtLink :to="localePath(`/events/${event.slug}`)">
							<img v-if="event.image" :src="event.image" :alt="event.title" loading="lazy" />
							<span>{{ event.title }}</span>
							<span class="fallback-date">{{ formatDate(event.date) }}</span>
						</NuxtLink>
					</li>
				</ul>
			</template>
		</ClientOnly>
	</div>

	<div class="flex justify-center w-full mt-8">
		<LandingLink
			:to="localePath('/upcoming-events')"
			class="see-more-btn"
			size="lg"
			styleName="outline"
			rel="noopener"
			target=""
		>
			{{ t("SEE_MORE") }} →
		</LandingLink>
	</div>

	<!-- <LandingLogos /> -->
	<LandingCompanies />
	<LandingEvent />

	<LandingContainer>
		<LandingCta />
	</LandingContainer>
</template>

<style>
.events-swiper-wrap {
	margin-top: 5rem;
	width: 100%;
}

.events-swiper {
	width: 100%;
	padding: 8px 8px 48px !important;
}

.events-swiper .swiper-wrapper {
	padding: 0 !important;
}

.events-swiper .swiper-slide {
	height: auto !important;
}

/* Pagination */
.events-swiper .swiper-pagination-bullet {
	background: #c9bdf7;
	opacity: 1;
	transition: all 0.25s ease;
}
.events-swiper .swiper-pagination-bullet-active {
	background: #7c5cfc;
	width: 22px;
	border-radius: 999px;
}

/* Navigation arrows */
.events-swiper .swiper-button-prev,
.events-swiper .swiper-button-next {
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background: #fff;
	border: 0.5px solid rgba(20, 16, 43, 0.12);
	color: #1c1530;
	box-shadow: 0 4px 12px -4px rgba(20, 16, 43, 0.2);
	transition: all 0.2s ease;
}
.events-swiper .swiper-button-prev::after,
.events-swiper .swiper-button-next::after {
	font-size: 13px;
	font-weight: 700;
}
.events-swiper .swiper-button-prev:hover,
.events-swiper .swiper-button-next:hover {
	background: #7c5cfc;
	color: #fff;
	border-color: transparent;
}

/* "See more" button */
.see-more-btn {
	border-radius: 999px;
	background: transparent;
	border-color: #1c1530;
	color: #1c1530;
	font-weight: 700;
	width: fit-content;
	transition:
		background 0.3s ease,
		color 0.3s ease,
		border-color 0.3s ease;
}
.see-more-btn:hover {
	background: #7c5cfc;
	border-color: #7c5cfc;
	color: #fff;
}

.swiperUnset .swiper-wrapper,
.swiperUnset .swiper-slide {
	height: unset !important;
}

/* Crawlable-only link list: hidden visually, present in the DOM/HTML */
.sr-only-events {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

/* Plain fallback list shown briefly before Swiper hydrates on the client */
.events-fallback-list {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 18px;
	list-style: none;
	padding: 8px;
	margin: 0;
}
.events-fallback-list li a {
	display: block;
	text-decoration: none;
	color: inherit;
}
.events-fallback-list img {
	width: 100%;
	height: auto;
	border-radius: 12px;
	display: block;
	margin-bottom: 8px;
}
.events-fallback-list .fallback-date {
	display: block;
	font-size: 0.85rem;
	opacity: 0.7;
}
</style>