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

const { filteredEvents, formatDate } = useEvents();

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
	<LandingContainer>
		<LandingHero></LandingHero>
		<LandingFeatures></LandingFeatures>
		<div v-if="filteredEvents.length > 0" class="mt-20 !bg-white">
			<Swiper
				:modules="modules"
				:spaceBetween="20"
				:slidesPerView="3"
				navigation
				:pagination="{ clickable: true }"
				:autoplay="{ delay: 3000, disableOnInteraction: false }"
				:breakpoints="{
					640: { slidesPerView: 1 },
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}"
				class="mySwiper w-full !bg-white"
			>
				<SwiperSlide v-for="event in filteredEvents" :key="event.id" class="w-full">
					<EventCard :event="event" :formatDate="formatDate" class="w-full" />
				</SwiperSlide>
			</Swiper>
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
		<LandingCta></LandingCta>
	</LandingContainer>
</template>
