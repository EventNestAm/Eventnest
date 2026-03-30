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

const { filteredEvents, formatDate, newFilteredEvents } = useEvents();

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
	<LandingContainer>
		<LandingHero></LandingHero>
		<LandingFeatures></LandingFeatures>
	</LandingContainer>

	<div v-if="filteredEvents.length > 0" class="mt-20">
		<ClientOnly>
		<Swiper
			:modules="modules"
			:spaceBetween="20"
			:loop="newFilteredEvents.length > 1"
			:slidesPerView="1.2"
			:centeredSlides="newFilteredEvents.length === 1"
			:centeredSlidesBounds="true"
			grabCursor="true"
			:autoplay="
				newFilteredEvents.length > 1 ? { delay: 3000, disableOnInteraction: false } : false
			"
			:breakpoints="{
				501: { slidesPerView: 1.6, centeredSlides: false },
				768: { slidesPerView: 2, centeredSlides: false },
				1024: { slidesPerView: 3, centeredSlides: false },
			}"
			class="mySwiper w-full"
		>
			<SwiperSlide v-for="event in newFilteredEvents" :key="event.id" class="w-full">
				<EventCard :event="event" :formatDate="formatDate" class="w-full" />
			</SwiperSlide>
		</Swiper>
		</ClientOnly>
	</div>

	<div class="flex justify-center w-full mt-10">
		<LandingLink
			class="rounded-full bg-transparent border-black hover:border-white text-black hover:bg-purple-600 hover:text-white font-bold w-fit transition-colors duration-300"
			size="lg"
			styleName="outline"
			rel="noopener"
			:to="`/upcoming-events`"
			target=""
			>Տեսնել ավելին →</LandingLink
		>
	</div>
	<LandingLogos></LandingLogos>

	<LandingCompanies></LandingCompanies>
	<LandingEvent></LandingEvent>

	<LandingContainer>
		<LandingCta></LandingCta>
	</LandingContainer>
</template>
<style>
.swiper-wrapper {
	padding: 20px;
}

.swiperUnset .swiper-wrapper,
.swiperUnset .swiper-slide {
	height: unset !important;
}
</style>
