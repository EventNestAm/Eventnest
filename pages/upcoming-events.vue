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
import EventCard from "@/components/EventCard.vue";

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
		eventDate: false,
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
		eventDate: false,
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
		eventDate: false,
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
		eventDate: false,
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
		eventDate: false,
	},
	{
		id: 6,
		title: "Կարգին հաղորդման վիկտորինա #2",
		date: "2025-10-12",
		time: "20:00",
		location: "Layers Yerevan, Երևան, Մեսրոպ Մաշտոցի պողոտա 37",
		image: Kargin,
		description:
			"Հումորային վիկտորինա, ներշնչված է լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։  Մասնակցության վճար՝ 2000 AMD։",
		category: "Վիկտորինա",
		eventDate: false,
	},
	{
		id: 7,
		title: "Կարգին հաղորդման վիկտորինա #3",
		date: "2025-11-07",
		time: "20:00",
		location: "Layers Yerevan, Երևան, Մեսրոպ Մաշտոցի պողոտա 37",
		image: Kargin,
		description:
			"Հումորային վիկտորինա, ներշնչված է լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։  Մասնակցության վճար՝ 2000 AMD։",
		category: "Վիկտորինա",
		eventDate: true,
	},
];

const sortOrder = ref("desc");
const sortedEvents = computed(() =>
	[...events].sort((a, b) => {
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

/* Card hover effect */
.shadow-md {
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
