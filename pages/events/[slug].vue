<script setup>
definePageMeta({
	layout: "landing",
});
import EventRegistrationForm from "@/components/EventRegistrationForm.vue";
import { useEvents } from "@/composables/useEvents";
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

const eventSlug = route.params.slug;

const { events } = useEvents();
const event = events.value.find((e) => e.slug === eventSlug);

const goBack = () => {
	if (window.history.length > 1) {
		router.back();
	} else {
		router.push("/upcoming-events");
	}
};

const { t } = useI18n();
</script>

<template>
	<div class="py-12 mt-10">
		<div v-if="event">
			<div class="relative md:mr-[8rem]">
				<NuxtImg
					src="/img/quiz.png"
					:alt="event.title"
					width="1920"
					height="820"
					sizes="100vw lg:80vw"
					format="webp"
					quality="100"
					preload
					priority
					class="w-full h-[820px] object-cover"
				/>

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
						<p class="flex items-center gap-2"><Calendar /> {{ event.dateTitle }}</p>
						<Circle />

						<p class="flex items-center gap-2"><Clock />{{ event.time }}</p>
						<Circle />

						<p class="flex items-center gap-2"><Ticket />{{ event.price }}</p>
						<Circle />

						<p class="flex items-center gap-2"><Gps />{{ event.location }}</p>
					</div>
				</div>
				<EventRegistrationForm
					class="absolute top-[30rem] sm:top-[18.75rem] lg:top-40 inset-x-0 sm:left-auto mx-auto sm:mx-0 right-0 sm:-right-20 z-[20]"
					:hasGroupName="event.groupName"
				/>
			</div>
			<div
				class="mt-64 sm:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch gap-5 md:gap-24"
			>
				<div class="bg-[#E1E9FB] w-[326px] px-5 py-8 rounded-xl flex flex-col h-full">
					<p class="flex gap-3 items-center justify-center">
						<Microphone />
						{{ t("HOW_ITS_WORK") }}
					</p>
					<div class="border-[#000000] border opacity-5 mt-2"></div>
					<div class="mt-8 grid gap-5">
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("HOW_IT_WORKS_FEATURES_FIRST") }}</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("HOW_IT_WORKS_FEATURES_SECOND") }}</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("HOW_IT_WORKS_FEATURES_THIRD") }}</p>
						</div>
					</div>
				</div>
				<div class="bg-[#E1E9FB] w-[326px] px-5 py-8 rounded-xl flex flex-col h-full">
					<p class="flex gap-3 items-center justify-center">
						<People />
						{{ t("FOR_WHOM") }}
					</p>
					<div class="border-[#000000] border opacity-5 mt-2"></div>
					<div class="mt-8 grid gap-5">
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("FOR_WHOM_FEATURES_FIRST") }}</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("FOR_WHOM_FEATURES_SECOND") }}</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("FOR_WHOM_FEATURES_THIRD") }}</p>
						</div>
					</div>
				</div>
				<div class="bg-[#E1E9FB] w-[326px] px-5 py-8 rounded-xl flex flex-col h-full">
					<p class="flex gap-3 items-center justify-center">
						<Heart />
						{{ t("WHY_YOU_WILL_LOVE_IT") }}
					</p>
					<div class="border-[#000000] border opacity-5 mt-2"></div>
					<div class="mt-8 grid gap-5">
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("WHY_YOU_WILL_LOVE_IT_FEATURES_FIRST") }}</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("WHY_YOU_WILL_LOVE_IT_FEATURES_SECOND") }}</p>
						</div>
						<div class="flex gap-2">
							<Checked />
							<p>{{ t("WHY_YOU_WILL_LOVE_IT_FEATURES_THIRD") }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="text-center py-20 text-gray-500 text-lg">
			{{ t("EVENT_NOT_FOUND") }}
		</div>
	</div>
</template>
