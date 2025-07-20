<template>
	<section class="px-4 sm:px-6 py-10 max-w-7xl mx-auto">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			<div
				v-for="event in filteredEvents"
				:key="event.id"
				class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 h-full flex flex-col"
			>
				<div class="relative">
					<img
						:src="event.image"
						:alt="event.title"
						class="w-20 h-20 object-cover"
						loading="lazy"
					/>
					<div
						class="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold"
					>
						{{ event.category }}
					</div>
				</div>
				<div class="p-6 flex-grow">
					<h3 class="text-xl font-bold mb-2 text-gray-800">{{ event.title }}</h3>
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
					<p class="text-gray-600 mb-5 line-clamp-3">
						{{ event.description }}
					</p>
					<div class="mt-auto">
						<NuxtLink
							:to="`/contact`"
							class="inline-block bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition font-medium text-sm shadow-md hover:shadow-lg"
						>
							Գրանցվել →
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
