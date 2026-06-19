<script setup>
import { ref, onMounted } from "vue";
import Person from "~/assets/icons/Person.vue";
import Phone from "~/assets/icons/Phone.vue";
import CountPeople from "~/assets/icons/CountPeople.vue";
import Mail from "~/assets/icons/Mail.vue";
import GroupName from "~/assets/icons/GroupName.vue";

const props = defineProps({
	hasGroupName: Boolean,
	eventName: String,
	isSoldOut: Boolean,
	quantity: Number,
});

const showGroupInput = props.hasGroupName;
const showTitle = props.eventName;
const { t, locale } = useI18n();
const showModal = ref(false);
const modalMessage = ref("");
const isLoading = ref(false);
const router = useRouter();

const route = useRoute();
const referralCookie = useCookie("referralSource");

if (route.query.ref) {
	referralCookie.value = route.query.ref;
}

const referralSource = referralCookie.value || route.query.ref || "direct";

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
		modalMessage.value = t("SENDING");

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
	router.push({
		path: `/${locale.value}/upcoming-events`,
	});
}
</script>

<template>
	<div class="reg-form">
		<p class="font-mono text-[10px] tracking-[0.3em] text-[#8B86A0] uppercase text-center mb-1">
			{{ t("SMART_SOCIAL_INTERACTIVE") }}
		</p>
		<h2 class="font-display text-xl font-bold text-[#1C1530] text-center mb-5">
			{{ t("REGISTRATION_EVENT") }}
		</h2>

		<form id="form" class="space-y-4 needs-validation" novalidate>
			<input type="hidden" name="access_key" value="3e1280a2-2fcd-4743-9230-5520ed1b4548" />
			<input type="checkbox" class="hidden" name="botcheck" />
			<input type="hidden" name="referral" :value="referralSource" />
			<input type="hidden" name="eventName" :value="showTitle" />

			<div class="grid sm:grid-cols-2 gap-3">
				<div class="field">
					<Person class="field__icon" />
					<input type="text" name="name" :placeholder="t('NAME') + ' *'" required class="field__input" />
				</div>
				<div class="field">
					<Person class="field__icon" />
					<input type="text" name="surname" :placeholder="t('SURNAME') + ' *'" required class="field__input" />
				</div>
			</div>

			<div class="field">
				<Phone class="field__icon" />
				<input type="tel" name="phone" :placeholder="t('PHONE') + ' *'" required class="field__input" />
			</div>

			<div class="field">
				<CountPeople class="field__icon" />
				<input
					type="number"
					name="peopleCount"
					:placeholder="t('NUMBER_OF_PARTICIPANTS') + ' *'"
					min="1"
					required
					class="field__input"
				/>
			</div>

			<div class="field">
				<Mail class="field__icon" />
				<input type="email" name="email" :placeholder="t('EMAIL') + ' *'" required class="field__input" />
			</div>

			<div class="field" v-if="showGroupInput">
				<GroupName class="field__icon" />
				<input type="text" name="groupName" :placeholder="t('GROUP_NAME') + ' *'" required class="field__input" />
			</div>

			<div class="field">
				<GroupName class="field__icon" />
				<input type="text" name="promocode" :placeholder="t('PROMOCODE')" class="field__input" />
			</div>

			<button type="submit" class="submit-btn">
				{{ t("CONFIRM_REGISTER") }}
			</button>

			<p class="font-mono text-[10px] tracking-[0.15em] text-[#8B86A0] text-center uppercase">
				{{ t("LIMITED_NUMBER") }} {{ props.quantity }} {{ t("PLACE") }}
			</p>
		</form>

		<transition name="fade">
			<div v-if="showModal" class="fixed inset-0 bg-[#14102B]/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
				<div class="bg-[#FFFCF7] rounded-2xl p-6 w-80 text-center relative shadow-2xl border border-[#1C1530]/5">
					<button
						@click="closeModal"
						class="absolute top-3 right-3 text-[#8B86A0] hover:text-[#1C1530] font-bold text-lg leading-none transition"
					>
						&times;
					</button>

					<div v-if="isLoading" class="flex flex-col items-center gap-3 py-2">
						<svg class="animate-spin h-8 w-8 text-[#7C5CFC]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
						</svg>
						<p class="font-mono text-xs tracking-[0.2em] text-[#7C5CFC] uppercase">{{ t("SENDING") }}</p>
					</div>

					<div v-else class="py-1">
						<p class="font-display font-semibold text-[#1C1530]">{{ modalMessage }}</p>
						<button @click="closeModal" class="mt-4 px-5 py-2 bg-[#7C5CFC] text-white text-sm font-semibold rounded-full hover:bg-[#6B4CE0] transition">
							{{ t("CLOSE") }}
						</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.field {
	position: relative;
	width: 100%;
}

.field__icon {
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	width: 1.1rem;
	height: 1.1rem;
	color: #8b86a0;
	pointer-events: none;
}

.field__input {
	width: 100%;
	padding: 0.75rem 1rem 0.75rem 2.75rem;
	background: #f6f3fc;
	border: 1.5px solid transparent;
	border-radius: 0.75rem;
	color: #1c1530;
	font-size: 0.9rem;
	outline: none;
	transition: border-color 0.2s ease, background 0.2s ease;
}

.field__input::placeholder {
	color: #9d97b8;
}

.field__input:focus {
	border-color: #7c5cfc;
	background: #ffffff;
}

.was-validated .field__input:invalid {
	border-color: #ff6f4d;
}

.submit-btn {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 0.85rem 1.5rem;
	background: linear-gradient(90deg, #7c5cfc, #6b4ce0);
	color: #fff;
	font-weight: 600;
	font-size: 0.95rem;
	border-radius: 999px;
	box-shadow: 0 10px 24px -8px rgba(124, 92, 252, 0.55);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-btn:hover {
	transform: translateY(-1px) scale(1.01);
	box-shadow: 0 14px 30px -8px rgba(124, 92, 252, 0.6);
}

.submit-btn:active {
	transform: scale(0.98);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>