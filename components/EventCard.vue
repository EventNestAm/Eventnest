<script setup>
defineProps({
	event: {
		type: Object,
		required: true,
	},
	formatDate: {
		type: Function,
		required: true,
	},
	eventDate: {
		type: Boolean,
		required: true,
	},
});
</script>

<template>
	<div
		class="relative h-full flex flex-col rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
	>
		<div class="relative">
			<img
				:src="event.image"
				alt="միջոցառումների կազմակերպում EventNest"
				class="w-full h-48 object-cover transition-all duration-500"
				:class="!event.eventDate ? 'grayscale blur-[1px] brightness-75' : ''"
				loading="lazy"
			/>
			<div
				class="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md"
			>
				{{ event.category }}
			</div>

			<div
				v-if="!event.eventDate"
				class="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-10 h-10 mb-2 opacity-80"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 11c1.104 0 2 .896 2 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2c0-1.104.896-2 2-2h3zM10 11V9a2 2 0 114 0v2"
					/>
				</svg>
				<p class="text-sm font-semibold tracking-wide">Միջոցառումը ավարտված է</p>
			</div>
		</div>

		<div class="p-3 sm:p-6 flex flex-col flex-grow bg-white">
			<h3
				class="text-xl font-bold mb-2"
				:class="event.eventDate ? 'text-gray-900' : 'text-gray-400 line-through'"
			>
				{{ event.title }}
			</h3>

			<div class="flex items-center text-gray-500 text-sm mb-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 mr-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<pre>{{ event.dateYear }}</pre>
				<time :datetime="event.date">{{ formatDate(event.date) }}</time>
				<span class="mx-2">•</span>
				<span>{{ event.time }}</span>
			</div>

			<div class="flex items-center text-gray-500 text-sm mb-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 mr-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				{{ event.location }}
			</div>

			<p
				class="text-gray-600 mb-5 line-clamp-3"
				:class="!event.eventDate ? 'text-gray-400' : ''"
			>
				{{ event.description }}
			</p>

			<div class="mt-auto">
				<NuxtLink
					:to="event.eventDate ? `/events/${event.id}` : null"
					class="group inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 relative"
					:class="[
						event.eventDate
							? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 hover:shadow-lg hover:-translate-y-0.5'
							: 'bg-gray-300 text-gray-400 cursor-not-allowed',
					]"
				>
					<span>{{ event.eventDate ? "Գրանցվել" : "Փակված է" }}</span>
					<span
						v-if="event.eventDate"
						class="transform transition-transform duration-300 group-hover:translate-x-1"
					>
						→
					</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
