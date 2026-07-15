<script setup>
definePageMeta({
	layout: "landing",
});
import { useEvents } from "@/composables/useEvents";
import EventCard from "@/components/EventCard.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const localePath = useLocalePath();

const { filteredEvents, formatDate, newFilteredEvents } = useEvents();

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
	<LandingContainer>
		<LandingHero />
		<LandingFeatures />
	</LandingContainer>

	<div v-if="filteredEvents.length > 0" class="events-swiper-wrap">
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
			Տեսնել ավելին →
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
</style>
