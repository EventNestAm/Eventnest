<script setup>
import { ref, onMounted } from "vue";
import Person from "~/assets/icons/Person.vue";
import Phone from "~/assets/icons/Phone.vue";
import CountPeople from "~/assets/icons/CountPeople.vue";

const showModal = ref(false);
const modalMessage = ref("");
const isLoading = ref(false);
const router = useRouter();

onMounted(() => {
	const form = document.getElementById("form");

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		form.classList.add("was-validated");

		if (!form.checkValidity()) {
			form.querySelectorAll(":invalid")[0].focus();
			return;
		}

		showModal.value = true;
		isLoading.value = true;
		modalMessage.value = "Ուղարկվում է...";

		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json" },
			body: json,
		})
			.then(async (response) => {
				let json = await response.json();
				isLoading.value = false;

				if (response.status === 200) {
					modalMessage.value = json.message;
				} else {
					modalMessage.value = json.message || "Տեղի ունեցավ սխալ!";
				}
			})
			.catch(() => {
				isLoading.value = false;
				modalMessage.value = "Տեղի ունեցավ սխալ!";
			})
			.finally(() => {
				form.reset();
				form.classList.remove("was-validated");
			});
	});
});

function closeModal() {
	showModal.value = false;
	router.push("/upcoming-events");
}
</script>

<template>
	<div
		class="bg-gradient-to-br from-[#5B1F14]/90 via-[#7A2E1F]/85 to-[#E9C6BF]/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-6"
	>
		<h2 class="text-xl font-bold text-white mb-2 text-center">Միջոցառման Գրանցում</h2>

		<p class="text-white text-center">Խելացի։ Սոցիալական։ Ինտերակտիվ։</p>

		<form id="form" class="space-y-5 needs-validation" novalidate>
			<input type="hidden" name="access_key" value="3e1280a2-2fcd-4743-9230-5520ed1b4548" />
			<input type="checkbox" class="hidden" name="botcheck" />

			<div class="grid sm:grid-cols-2 gap-5 max-w-[30rem]">
				<div class="relative w-full">
					<Person
						class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none z-20"
					/>

					<input
						type="text"
						name="name"
						placeholder="Անուն *"
						required
						class="w-full pl-12 pr-4 py-3 border border-gray-300 text-white placeholder:text-white rounded-xl outline-none transition relative z-10 bg-transparent"
					/>

					<!-- <div class="invalid-feedback text-red-500 text-sm">
						Խնդրում ենք մուտքագրել անունը
					</div> -->
				</div>

				<div class="w-full">
					<div class="relative">
						<Person
							class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none z-10"
						/>

						<input
							type="text"
							name="surname"
							placeholder="Ազգանուն *"
							required
							class="w-full pl-12 pr-4 py-3 border border-gray-300 placeholder:text-white text-white rounded-xl outline-none transition bg-transparent"
						/>
					</div>

					<div class="invalid-feedback text-red-500 text-sm ">
						Խնդրում ենք մուտքագրել ազգանունը
					</div>
				</div>
			</div>

			<div class="w-full">
				<div class="relative">
					<Phone
						class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none z-10"
					/>
					<input
						type="tel"
						name="phone"
						placeholder="Հեռախոսահամար *"
						required
						class="w-full pl-12 pr-4 py-3 border border-gray-300 placeholder:text-white text-white rounded-xl outline-none transition bg-transparent"
					/>
					<!-- <div class="invalid-feedback text-red-500 text-sm mt-1">
						Խնդրում ենք մուտքագրել ձեր հեռախոսահամարը
					</div> -->
				</div>
			</div>

			<div class="w-full">
				<div class="relative">
					<count-people
						class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none z-10"
					/>
					<input
						type="number"
						name="peopleCount"
						placeholder="Քանի հոգի եք գալիս *"
						min="1"
						required
						class="w-full pl-12 pr-4 py-3 border border-gray-300 placeholder:text-white text-white rounded-xl outline-none transition bg-transparent"
					/>
					<!-- <div class="invalid-feedback text-red-500 text-sm mt-1">
						Խնդրում ենք նշել մարդկանց թիվը
					</div> -->
				</div>
			</div>

			<button
				type="submit"
				class="py-3 px-5 flex justify-center items-center mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition transform relative overflow-hidden"
			>
				Հաստատել գրանցումը
			</button>
			<p class="text-white text-center">* Տեղերը Սահմանափակ են</p>
		</form>

		<!-- Modal -->
		<transition name="fade">
			<div
				v-if="showModal"
				class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			>
				<div class="bg-white rounded-2xl p-6 w-80 text-center relative shadow-xl">
					<button
						@click="closeModal"
						class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
					>
						&times;
					</button>

					<div v-if="isLoading" class="flex flex-col items-center gap-3">
						<svg
							class="animate-spin h-8 w-8 text-purple-600"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							/>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
						</svg>
						<p class="text-purple-700 font-semibold">Ուղարկվում է...</p>
					</div>

					<div v-else>
						<p class="text-green-600 font-semibold">{{ modalMessage }}</p>
						<button
							@click="closeModal"
							class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
						>
							Փակել
						</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<style>
.invalid-feedback {
	display: none;
}
.was-validated :invalid ~ .invalid-feedback {
	display: block;
}

/* Fade transition for modal */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
