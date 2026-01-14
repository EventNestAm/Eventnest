<script setup>
definePageMeta({
	layout: "landing",
});
import EventRegistrationForm from "@/components/EventRegistrationForm.vue";
import { useEvents } from "@/composables/useEvents";
import Quiz from "@/assets/img/quiz.png?url";
import Calendar from "~/assets/icons/Calendar.vue";
import Clock from "~/assets/icons/Clock.vue";
import Ticket from "~/assets/icons/Ticket.vue";
import Gps from "~/assets/icons/Gps.vue";
import Circle from "~/assets/icons/Circle.vue";
import Microphone from "~/assets/icons/Microphone.vue";
import Checked from "~/assets/icons/Checked.vue";
import People from "~/assets/icons/People.vue";
import Heart from "~/assets/icons/Heart.vue";

const route = useRoute();
const router = useRouter();
const eventId = route.params.id;

const { events } = useEvents();

const event = events?.value?.find((e) => e.id === Number(eventId));

const goBack = () => {
	if (window.history.length > 1) {
		router.back();
	} else {
		router.push("/upcoming-events");
	}
};
</script>

<template>
	<div class="py-12 mt-10">
		<div v-if="event">
			<div class="relative md:mr-[8rem]">
				<img :src="Quiz" :alt="event.title" class="w-full h-[820px] object-cover" />

				<div
					class="absolute -bottom-[10px] lg:-bottom-[18.75rem] left-0 w-full h-full flex flex-col gap-6 p-6 md:p-10 z-[10] max-w-[54rem] xl:max-w-none"
				>
					<div>
						<h1
							class="text-xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 text-center sm:text-start"
						>
							{{ event.title }}
						</h1>
						<p class="text-white mt-5 text-center sm:text-start">
							{{ event.description }}
						</p>
					</div>

					<div class="text-white flex flex-col sm:flex-row flex-wrap gap-5 items-center">
						<p class="flex items-center gap-2"><Calendar /> {{ event.date }}</p>
						<Circle />

						<p class="flex items-center gap-2"><Clock />{{ event.time }}</p>
						<Circle />

						<p class="flex items-center gap-2"><Ticket />{{ event.price }}</p>
						<Circle />

						<p class="flex items-center gap-2"><Gps />{{ event.location }}</p>
					</div>
					<!-- <button
						class="max-w-[15.75rem] px-12 py-[14px] rounded-full text-white font-medium bg-gradient-to-r from-indigo-500/85 via-purple-500/85 to-pink-500/85 backdrop-blur-[14px] shadow-[0_8px_24px_rgba(99,102,241,0.35)] before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] relative"
					>
						Reserve Your Seat
					</button> -->
				</div>
				<EventRegistrationForm
					class="absolute top-[30rem] sm:top-[18.75rem] lg:top-40 inset-x-0 sm:left-auto mx-auto sm:mx-0 right-0 sm:-right-20 z-[20]"
				/>
			</div>
			<div
				class="mt-52 sm:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch gap-5 md:gap-24"
			>
				<div class="bg-[#E1E9FB] w-[326px] px-5 py-8 rounded-xl flex flex-col h-full">
					<p class="flex gap-3 items-center justify-center">
						<Microphone />
						Ինչպես է այն աշխատում
					</p>
					<div class="border-[#000000] border opacity-5 mt-2"></div>
					<div class="mt-8 grid gap-5">
						<div class="flex gap-2">
							<Checked />
							<p>Վարում է խաղավարը</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>Իրական հաղորդակցություն</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>Որևէ փորձ անհրաժեշտ չէ</p>
						</div>
					</div>
				</div>
				<div class="bg-[#E1E9FB] w-[326px] px-5 py-8 rounded-xl flex flex-col h-full">
					<p class="flex gap-3 items-center justify-center">
						<People />
						Ում համար է այն
					</p>
					<div class="border-[#000000] border opacity-5 mt-2"></div>
					<div class="mt-8 grid gap-5">
						<div class="flex gap-2">
							<Checked />
							<p>Փորձառություն որոնողներ</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>Ստրատեգներ և մտածողներ</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>Մենակատար կամ թմային խաղացողներ</p>
						</div>
					</div>
				</div>
				<div class="bg-[#E1E9FB] w-[326px] px-5 py-8 rounded-xl flex flex-col h-full">
					<p class="flex gap-3 items-center justify-center">
						<Heart />
						Ինչու դուք կսիրեք այն
					</p>
					<div class="border-[#000000] border opacity-5 mt-2"></div>
					<div class="mt-8 grid gap-5">
						<div class="flex gap-2">
							<Checked />
							<p>Սոցիալական տրամադրություն</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>Նոր մարդիկ</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>Անմոռանալի խաղ</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="text-center py-20 text-gray-500 text-lg">
			Այս միջոցառումը չի գտնվել 😕
		</div>
	</div>
</template>
