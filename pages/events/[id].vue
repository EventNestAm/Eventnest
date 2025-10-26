<script setup>
definePageMeta({
	layout: "landing",
});
import EventRegistrationForm from "@/components/EventRegistrationForm.vue";

const route = useRoute();
const router = useRouter();
const eventId = route.params.id;

import { useEvents } from "@/composables/useEvents";
const { events } = useEvents();


const event = events.find((e) => e.id === Number(eventId));

const goBack = () => {
	router.back();
};
</script>

<template>
	<div class="container mx-auto py-12 px-4 mt-20">
		<button
			@click="goBack"
			class="mb-5 group flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
		>
			<span class="transform group-hover:-translate-x-1 transition-transform duration-300">
				←
			</span>
			Վերադառնալ
		</button>

		<div v-if="event" class="grid md:grid-cols-2 gap-10 items-start">
			<div class="overflow-hidden rounded-2xl shadow-lg">
				<img
					:src="event.image"
					:alt="event.title"
					class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
				/>
			</div>

			<div class="flex flex-col gap-6">
				<div>
					<h1 class="text-4xl font-extrabold text-gray-900 mb-3">
						{{ event.title }}
					</h1>
					<span
						class="inline-block px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700 font-semibold"
					>
						{{ event.category }}
					</span>
				</div>

				<div class="space-y-3 text-gray-700">
					<p><strong>📅 Ամսաթիվ:</strong> {{ event.date }} / {{ event.time }}</p>
					<p><strong>📍 Վայր:</strong> {{ event.location }}</p>
					<p>{{ event.description }}</p>
				</div>

				<EventRegistrationForm />
			</div>
		</div>

		<div v-else class="text-center py-20 text-gray-500 text-lg">
			Այս միջոցառումը չի գտնվել 😕
		</div>
	</div>
</template>
