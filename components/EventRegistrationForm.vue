<script setup>
import { ref, onMounted } from "vue";
import Person from "~/assets/icons/Person.vue";
import Phone from "~/assets/icons/Phone.vue";
import CountPeople from "~/assets/icons/CountPeople.vue";
import Mail from "~/assets/icons/Mail.vue";
import GroupName from "~/assets/icons/GroupName.vue";
import { START_LOCATION } from "vue-router";
import Coupon from "~/assets/icons/Coupon.vue";
const props = defineProps({
	hasGroupName: Boolean,
	eventName: String,
	type: String,
	isSoldOut: Boolean,
	quantity: Number,
	// Price per participant, in whole AMD (e.g. 3000 = 3000 AMD).
	// Converted to minor units (luma) internally before calling EPG.
	pricePerPerson: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		default: "051", // AMD
	},
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

function generateOrderNumber() {
	// Unique per submission; EPG requires 1..32 alphanumeric chars.
	return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

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

		// Step 1: keep the existing lead-capture / notification flow.
		fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json" },
			body: json,
		})
			.then(async (response) => {
				const result = await response.json();

				if (response.status !== 200) {
					isLoading.value = false;
					modalMessage.value = result.message || "Տեղի ունեցավ սխալ!";
					return;
				}

				if (typeof window !== "undefined" && window.fbq) {
					window.fbq("track", "CompleteRegistration");
				}

				// Step 2: register the order with EPG and get the hosted
				// payment page URL. Credentials are handled server-side by
				// /api/epg/register — never exposed to the browser.
				const peopleCount = Number(object.peopleCount) || 1;
				// pricePerPerson is in whole AMD (e.g. 3000 = 3000 AMD).
				// EPG's amount field expects minor units (luma): 100 luma = 1 AMD.
				const amount = props.pricePerPerson * 100 * peopleCount;

				try {
					const orderNumber = generateOrderNumber();
					const buyerName = `${object.name} ${object.surname}`.trim();

					// Step 2a: mint a signed "ticket token" that carries the
					// buyer's info through the bank redirect round-trip.
					// There's no database — this token IS how payment-result
					// knows who to email the QR ticket to afterwards.
					const { token } = await $fetch("/api/tickets/create-token", {
						method: "POST",
						body: {
							orderNumber,
							email: object.email,
							phone: object.phone,
							name: buyerName,
							eventName: showTitle,
							groupName: object.groupName,
							peopleCount,
							amount,
						},
					});

					const paymentResponse = await $fetch("/api/epg/register", {
						method: "POST",
						body: {
							orderNumber,
							amount,
							currency: props.currency,
							description: showTitle,
							email: object.email,
							phone: object.phone,
							name: buyerName,
							language: locale.value,
							// EPG appends its own `orderId` query param to whatever
							// we send here, so `t` survives the round trip too.
							returnUrl: `${window.location.origin}/${locale.value}/payment-result?t=${encodeURIComponent(token)}`,
						},
					});

					// Step 3: send the customer to the EPG hosted payment page.
					window.location.href = paymentResponse.formUrl;
				} catch (err) {
					isLoading.value = false;
					modalMessage.value =
						err?.data?.statusMessage || "Չհաջողվեց սկսել վճարումը: Փորձեք կրկին:";
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
					<input
						type="text"
						name="name"
						:placeholder="t('NAME') + ' *'"
						required
						class="field__input"
					/>
				</div>
				<div class="field">
					<Person class="field__icon" />
					<input
						type="text"
						name="surname"
						:placeholder="t('SURNAME') + ' *'"
						required
						class="field__input"
					/>
				</div>
			</div>

			<div class="field">
				<Phone class="field__icon" />
				<input
					type="tel"
					name="phone"
					:placeholder="t('PHONE') + ' *'"
					required
					class="field__input"
				/>
			</div>

			<div class="field">
				<Coupon v-if="props.type === 'special'" class="field__icon" />

				<CountPeople v-else class="field__icon" />

				<input
					type="number"
					:name="props.type === 'special' ? 'couponCount' : 'peopleCount'"
					:placeholder="
						props.type === 'special'
							? t('NUMBER_OF_COUPONS') + ' *'
							: t('NUMBER_OF_PARTICIPANTS') + ' *'
					"
					min="1"
					required
					class="field__input"
				/>
			</div>

			<div class="field">
				<Mail class="field__icon" />
				<input
					type="email"
					name="email"
					:placeholder="t('EMAIL') + ' *'"
					required
					class="field__input"
				/>
			</div>

			<div class="field" v-if="showGroupInput">
				<GroupName class="field__icon" />
				<input
					type="text"
					name="groupName"
					:placeholder="t('GROUP_NAME') + ' *'"
					required
					class="field__input"
				/>
			</div>

			<div class="privacy-field">
				<input
					type="checkbox"
					id="privacyPolicy"
					name="privacyPolicy"
					required
					class="privacy-field__checkbox"
				/>
				<label for="privacyPolicy" class="privacy-field__label">
					{{ t("PRIVACY_POLICY_AGREE_PREFIX") }}
					<NuxtLink
						:to="`/${locale}/privacy-policy`"
						target="_blank"
						class="privacy-field__link"
					>
						{{ t("PRIVACY_POLICY") }}
					</NuxtLink>
					{{ t("PRIVACY_POLICY_AGREE_SUFFIX") }}
				</label>
				<div class="privacy-field__feedback">
					{{ t("PRIVACY_POLICY_REQUIRED") }}
				</div>
			</div>

			<button type="submit" class="submit-btn">
				{{ t("CONFIRM_REGISTER") }}
			</button>

			<p class="font-mono text-[10px] tracking-[0.15em] text-[#8B86A0] text-center uppercase">
				{{ t("LIMITED_NUMBER") }} {{ props.quantity }} {{ t("PLACE") }}
			</p>

			<!-- Accepted Payments Section -->
			<div class="payment-methods">
				<!-- ArCa Logo -->
				<svg
					class="payment-icon"
					viewBox="0 0 100 60"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="100" height="60" rx="6" fill="#1B385D" />
					<text
						x="50"
						y="38"
						font-family="'Space Grotesk', sans-serif"
						font-weight="bold"
						font-size="22"
						fill="#FFFFFF"
						text-anchor="middle"
						letter-spacing="1"
					>
						ArCa
					</text>
					<path
						d="M20 44 C35 38, 65 38, 80 44"
						stroke="#D32F2F"
						stroke-width="3"
						stroke-linecap="round"
					/>
				</svg>

				<!-- Visa Logo -->
				<svg
					class="payment-icon"
					viewBox="0 0 100 60"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="100" height="60" rx="6" fill="#0A2540" />
					<path
						d="M38.8 40L42.2 20H47.6L44.2 40H38.8ZM61.8 20.6C60.7 20.2 59.1 19.8 57.1 19.8C52.1 19.8 48.6 22.3 48.6 25.9C48.6 28.6 51.1 30.1 53 31C54.9 31.9 55.6 32.5 55.6 33.4C55.6 34.7 54 35.3 52.4 35.3C50.3 35.3 49.1 35 47.4 34.2L46.6 33.8L45.8 38.8C47.4 39.5 50.1 40.1 52.8 40.1C58.2 40.1 61.7 37.5 61.7 33.5C61.7 29.8 59.2 28.3 56.6 27.1C55.2 26.4 54.3 25.7 54.3 24.8C54.3 23.9 55.4 23.1 57.3 23.1C58.9 23.1 60.1 23.4 61.1 23.8L61.8 20.6ZM75.8 20H71.7C70.4 20 69.4 20.4 68.9 21.6L60.5 40H66.2L67.3 36.8H74.3L75 40H80L75.8 20ZM68.9 32.5L71.8 24.6L73.5 32.5H68.9ZM34.2 20L28.9 33.6L28.3 30.7C27.3 27.2 24.1 23.3 20.2 21.2L25.1 40H30.8L40 20H34.2Z"
						fill="#FFC800"
					/>
				</svg>

				<!-- Mastercard Logo -->
				<svg
					class="payment-icon"
					viewBox="0 0 100 60"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="100" height="60" rx="6" fill="#14102B" />
					<circle cx="41" cy="30" r="15" fill="#EB001B" />
					<circle cx="59" cy="30" r="15" fill="#F79E1B" />
					<path
						d="M50 18.2A14.96 14.96 0 0 0 41 30c0 4.8 2.3 9.1 5.9 11.8A14.96 14.96 0 0 0 59 30c0-4.8-2.3-9.1-5.9-11.8z"
						fill="#FF5F00"
					/>
				</svg>
			</div>
		</form>

		<transition name="fade">
			<div
				v-if="showModal"
				class="fixed inset-0 bg-[#14102B]/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
			>
				<div
					class="bg-[#FFFCF7] rounded-2xl p-6 w-80 text-center relative shadow-2xl border border-[#1C1530]/5"
				>
					<button
						@click="closeModal"
						class="absolute top-3 right-3 text-[#8B86A0] hover:text-[#1C1530] font-bold text-lg leading-none transition"
					>
						&times;
					</button>

					<div v-if="isLoading" class="flex flex-col items-center gap-3 py-2">
						<svg
							class="animate-spin h-8 w-8 text-[#7C5CFC]"
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
						<p class="font-mono text-xs tracking-[0.2em] text-[#7C5CFC] uppercase">
							{{ t("SENDING") }}
						</p>
					</div>

					<div v-else class="py-1">
						<p class="font-display font-semibold text-[#1C1530]">{{ modalMessage }}</p>
						<button
							@click="closeModal"
							class="mt-4 px-5 py-2 bg-[#7C5CFC] text-white text-sm font-semibold rounded-full hover:bg-[#6B4CE0] transition"
						>
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

.field,
.field__input {
	box-sizing: border-box;
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
	box-sizing: border-box;
	width: 100%;
	padding: 0.75rem 1rem 0.75rem 2.75rem;
	line-height: 1.5;
	background: #f6f3fc;
	border: 1.5px solid transparent;
	border-radius: 0.75rem;
	color: #1c1530;
	font-size: 0.9rem;
	outline: none;
	transition:
		border-color 0.2s ease,
		background 0.2s ease;
}

.field__input::placeholder {
	line-height: 3;
	color: #9d97b8;
}

.field__input {
	font-family: "Noto Sans Armenian", "Arial Armenian", Arial, sans-serif;
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
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
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

.privacy-field {
	display: flex;
	align-items: flex-start;
	gap: 0.6rem;
}

.privacy-field__checkbox {
	width: 1.1rem;
	height: 1.1rem;
	margin-top: 0.15rem;
	flex-shrink: 0;
	accent-color: #7c5cfc;
	cursor: pointer;
}

.privacy-field__label {
	font-size: 0.85rem;
	color: #1c1530;
	line-height: 1.4;
	cursor: pointer;
}

.privacy-field__link {
	color: #7c5cfc;
	font-weight: 600;
	text-decoration: underline;
}

.privacy-field__link:hover {
	color: #6b4ce0;
}

.privacy-field__feedback {
	display: none;
	font-size: 0.75rem;
	color: #ff6f4d;
	margin-top: -0.4rem;
}

.was-validated .privacy-field__checkbox:invalid ~ .privacy-field__feedback {
	display: block;
}

.was-validated .privacy-field__checkbox:invalid {
	outline: 2px solid #ff6f4d;
	outline-offset: 2px;
}

.payment-methods {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.6rem;
	margin-top: 0.75rem;
	opacity: 0.85;
	transition: opacity 0.2s ease;
}

.payment-methods:hover {
	opacity: 1;
}

.payment-icon {
	height: 22px;
	width: auto;
	border-radius: 4px;
	filter: drop-shadow(0 2px 4px rgba(28, 21, 48, 0.08));
	cursor: pointer;
}
</style>
