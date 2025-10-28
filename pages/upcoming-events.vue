<script setup>
definePageMeta({
	layout: "landing",
});

import EventCard from "@/components/EventCard.vue";
import { useEvents } from "@/composables/useEvents";

const { events, formatDate } = useEvents();

const sortOrder = ref("desc");
const sortedEvents = computed(() =>
	[...events.value].sort((a, b) => {
		return sortOrder.value === "asc"
			? new Date(a.date) - new Date(b.date)
			: new Date(b.date) - new Date(a.date);
	})
);
const displayedEvents = computed(() => {
	return [...filteredEvents.value].sort((a, b) =>
		sortOrder.value === "asc"
			? new Date(a.date) - new Date(b.date)
			: new Date(b.date) - new Date(a.date)
	);
});

const categories = ["Բոլորը", "Վիկտորինա", "Ի՞նչ որտե՞ղ ե՞րբ", "Ֆուտբոլ", "Մաֆիա"];
const selectedCategory = ref("Բոլորը");
const searchQuery = ref("");

const selectedDate = ref("");

const filteredEvents = computed(() => {
	return events.value.filter((event) => {
		const matchesCategory =
			selectedCategory.value === "Բոլորը" ||
			event.title.includes(selectedCategory.value) ||
			event.description.includes(selectedCategory.value) ||
			(event.category && event.category.includes(selectedCategory.value));

		const matchesSearch =
			event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			event.description.toLowerCase().includes(searchQuery.value.toLowerCase());

		const matchesDate = !selectedDate.value || event.date === selectedDate.value;

		return matchesCategory && matchesSearch && matchesDate;
	});
});
</script>

<template>
	<LandingSectionhead>
		<template #title>
			<h1 class="text-black uppercase text-3xl font-bold pt-32 sm:pt-28">
				Մոտակա միջոցառումներ
			</h1>
		</template>
	</LandingSectionhead>

	<section
		class="bg-gradient-to-r from-purple-500 to-indigo-600 py-12 px-4 text-center text-white my-10"
	>
		<h2 class="sm:text-xl text-2xl md:text-3xl font-bold mb-4">Գտեք Ձեր ցանկալի միջոցառումը</h2>
		<p class="text-lg text-purple-100 max-w-2xl mx-auto">
			Միացիր մեզ և անցկացրու անմոռանալի երեկոներ EventNest-ում։
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Որոնել միջոցառման անվանումով"
				class="px-4 py-3 rounded-xl border-0 shadow-md w-72 focus:ring-2 focus:ring-purple-300 focus:outline-none text-black"
			/>
			<input
				v-model="selectedDate"
				type="date"
				class="px-4 py-3 rounded-xl border-0 shadow-md focus:ring-2 focus:ring-purple-300 focus:outline-none text-black"
			/>
		</div>
	</section>

	<div class="container mx-auto">
		<div class="w-full flex flex-col md:flex-row justify-center">
			<div class="w-full flex justify-center flex-wrap gap-3 my-8 px-4 mb-10">
				<button
					v-for="cat in categories"
					:key="cat"
					@click="selectedCategory = cat"
					:class="[
						'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
						selectedCategory === cat
							? 'bg-purple-600 text-white shadow-md'
							: 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700',
					]"
				>
					{{ cat }}
				</button>
			</div>
			<div class="my-auto mb-10 h-full flex justify-end mr-4 md:mr-0">
				<button
					@click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
					class="w-fit px-3 py-1.5 bg-purple-600 text-white rounded-md whitespace-nowrap"
				>
					Դասավորել: {{ sortOrder === "asc" ? "Հին → Նոր" : "Նոր → Հին" }}
				</button>
			</div>
		</div>
		<LandingContainer v-if="filteredEvents.length > 0">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
				<EventCard
					v-for="event in displayedEvents"
					:key="event.id"
					:event="event"
					:formatDate="formatDate"
				/>
			</div>
		</LandingContainer>
		<section v-else class="py-16 text-center">
			<div class="max-w-md max-h-md mx-auto">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-10 w-10 mx-auto text-gray-400"
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
				<h3 class="text-xl font-medium text-gray-700 mt-4">Միջոցառումներ չեն գտնվել</h3>
				<p class="text-gray-500 mt-2">
					Փորձեք փոխել որոնման պարամետրերը կամ ստուգել ավելի ուշ:
				</p>
				<button
					@click="
						selectedCategory = 'Բոլորը';
						searchQuery = '';
						selectedDate = '';
					"
					class="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition font-medium text-sm"
				>
					Վերականգնել ֆիլտրերը
				</button>
			</div>
		</section>
	</div>
</template>

<style>
button,
a,
input {
	transition: all 0.2s ease;
}

input:focus,
button:focus {
	outline: none;
}

.shadow-md {
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
