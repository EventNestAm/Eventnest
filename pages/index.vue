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
		
		<div
			v-if="filteredEvents.length > 0"
			class="mt-20 lg:px-16 max-w-screen-[99.75rem] !bg-transparent"
		>
			<Swiper
				:modules="modules"
				:spaceBetween="20"
				:loop="true"
				:slidesPerView="1.2"
				grabCursor="true"
				:autoplay="{ delay: 3000, disableOnInteraction: false }"
				:breakpoints="{
					501: { slidesPerView: 1.6 },
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}"
				class="mySwiper w-full p-5 swiperUnset"
			>
				<SwiperSlide v-for="event in filteredEvents" :key="event.id" class="w-full sasas">
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
	</LandingContainer>

	<LandingCompanies></LandingCompanies>
	<LandingContainer>
		<LandingCta></LandingCta>
	</LandingContainer>
</template>
<style>
.swiper-wrapper{
	padding: 20px;
}

.swiperUnset {
  .swiper-wrapper,
  .swiper-slide {
    height: unset !important;
  }
}
</style>