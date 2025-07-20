<script setup>
definePageMeta({
	layout: "landing",
});
import Mafia from "@/assets/img/mafia.png?url";
import whatWhere from "@/assets/img/whatWhere.png?url";
import Football from "@/assets/img/football.png?url";
import Movie from "@/assets/img/movie.png?url";
import Music from "@/assets/img/music.png?url";
import Kargin from "@/assets/img/kargin.jpeg?url";

const events = [
	{
		id: 1,
		title: "Կարգին հաղորդման վիկտորինա",
		date: "2025-08-01",
		time: "20:00",
		location: "73 Club, Երևան, Խանջյան փողոց, 33",
		image: Kargin,
		description:
			" Հումորային վիկտորինա, ներշնչված է լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։  Մասնակցության վճար՝ 2000 AMD։",
		category: "Վիկտորինա",
	},
	{
		id: 2,
		title: "Ֆուտբոլային վիկտորինա",
		date: "2025-08-08",
		time: "20:00",
		location: "73 Club, Երևան, Խանջյան փողոց, 33",
		image: Football,
		description:
			"Ճանաչիր ֆուտբոլը՝ հետաքրքիր հարցերի և թիմային խաղի միջոցով։ Մասնակցության վճար՝ 2000 AMD։",
		category: "Ֆուտբոլ",
	},
	{
		id: 3,
		title: "Երաժշտական վիկտորինա",
		date: "2025-08-15",
		time: "20:00",
		location: "73 Club, Երևան, Խանջյան փողոց, 33",
		image: Music,
		description:
			"Պատրա՞ստ ես ապացուցել, որ ճանաչում ես բոլոր երգերն առաջին նոտայից։ Երաժշտական վիկտորինան սպասում է միայն ամենախելացի ականջներին։ Մասնակցության վճար՝ 2000 AMD։",
		category: "Վիկտորինա",
	},
	{
		id: 4,
		title: "Ի՞նչ որտե՞ղ ե՞րբ",
		date: "2025-08-22",
		time: "20:00",
		location: "73 Club, Երևան, Խանջյան փողոց, 33",
		image: whatWhere,
		description:
			"Միացիր ամենախելացի ակումբին։«Ի՞նչ, Որտե՞ղ, Ե՞րբ» խաղը քեզ մարտահրավեր է նետում՝ վերլուծելու, մտածելու ու հաղթելու։ Մասնակցության վճար՝ 3000 AMD։",
		category: "Ի՞նչ որտե՞ղ ե՞րբ",
	},
	{
		id: 5,
		title: "Կինո վիկտորինա",
		date: "2025-08-29",
		time: "20:00",
		location: "73 Club, Երևան, Խանջյան փողոց, 33",
		image: Movie,
		description:
			"Քո ուղեղը IMDb-ից լավն է՞։Դե ապացուցիր՝ որքա՞ն լավ ես ճանաչում կինոաշխարհը՝ կատակներով, դերերով ու սաունդթրեքներով։Մասնակցության վճար՝ 2000 AMD",
		category: "Վիկտորինա",
	},
];

const categories = ["Բոլորը", "Վիկտորինա", "Ի՞նչ որտե՞ղ ե՞րբ", "Ֆուտբոլ", "Մաֆիա"];
const selectedCategory = ref("Բոլորը");
const searchQuery = ref("");
const selectedDate = ref("");

function formatDate(dateStr) {
	const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
	return new Date(dateStr).toLocaleDateString("hy-AM", options);
}

const filteredEvents = computed(() => {
	return events.filter((event) => {
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
	<LandingContainer>
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
			<h2 class="text-2xl font-bold mb-4">Գտեք Ձեր ցանկալի միջոցառումը</h2>
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

		<!-- Category Filters -->
		<div class="flex flex-wrap gap-3 justify-center my-8 px-4 mb-10">
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

		<!-- Events Grid -->
		<section v-if="filteredEvents.length > 0" class="px-4 sm:px-6 py-10 max-w-7xl mx-auto">
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

		<!-- Load More (hidden when filtered) -->
		<!-- <div
			v-if="selectedCategory === 'Բոլորը' && !searchQuery && !selectedDate"
			class="text-center mt-8 mb-12"
		>
			<button
				class="bg-purple-600 text-white px-8 py-3 rounded-lg text-base hover:bg-purple-700 transition font-medium shadow-md hover:shadow-lg"
			>
				Ցուցադրել ավելին
			</button>
		</div> -->
	</LandingContainer>
</template>

<style>
/* Smooth transitions for interactive elements */
button,
a,
input {
	transition: all 0.2s ease;
}

/* Better focus states */
input:focus,
button:focus {
	outline: none;
	/* ring: 2px;
  ring-purple-300; */
}

/* Card hover effect */
.shadow-md {
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
