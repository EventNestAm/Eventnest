<script setup>
// pages/[locale]/payment-result.vue
//
// Page EPG redirects the customer back to (returnUrl) after they finish on
// the hosted payment page. The redirect itself is NOT proof of payment —
// we always re-check status server-side via /api/epg/status before showing
// success.

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

const isLoading = ref(true);
const result = ref(null);
const error = ref(null);
const qrDataUrl = ref(null);
const ticketError = ref(null);

const REDIRECT_SECONDS = 15;
const secondsLeft = ref(REDIRECT_SECONDS);
let redirectTimer = null;
let countdownTimer = null;

function goHome() {
	router.push(`/${locale.value}`);
}

onMounted(async () => {
	const orderId = route.query.orderId;

	if (!orderId) {
		error.value = t("PAYMENT_MISSING_ORDER");
		isLoading.value = false;
		return;
	}

	try {
		result.value = await $fetch("/api/epg/status", {
			query: { orderId },
		});
	} catch (err) {
		error.value = err?.data?.statusMessage || t("PAYMENT_CHECK_FAILED");
	} finally {
		isLoading.value = false;
	}

	if (result.value?.paid) {
		// The signed token minted before checkout (see
		// EventRegistrationForm.vue) rides along on returnUrl as `t`. EPG
		// appends its own `orderId`, so both are present here.
		const token = route.query.t;

		if (token) {
			try {
				const ticket = await $fetch("/api/tickets/confirm", {
					method: "POST",
					body: { orderId, token },
				});
				qrDataUrl.value = ticket.qrDataUrl;
			} catch (err) {
				// Payment still succeeded — just surface that the ticket/email
				// step failed so support can follow up manually if needed.
				ticketError.value = err?.data?.statusMessage || t("PAYMENT_CHECK_FAILED");
			}
		}

		// Only auto-redirect once we've tried to issue the ticket, so the
		// customer has time to see/save the QR code first.
		countdownTimer = setInterval(() => {
			secondsLeft.value -= 1;
			if (secondsLeft.value <= 0) clearInterval(countdownTimer);
		}, 1000);
		redirectTimer = setTimeout(goHome, REDIRECT_SECONDS * 1000);
	}
});

onUnmounted(() => {
	if (redirectTimer) clearTimeout(redirectTimer);
	if (countdownTimer) clearInterval(countdownTimer);
});
</script>

<template>
	<div class="result-page">
		<!-- Loading -->
		<div v-if="isLoading" class="result-card">
			<div class="spinner" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle class="spinner__track" cx="12" cy="12" r="10" stroke-width="3" />
					<path
						class="spinner__head"
						d="M22 12a10 10 0 0 0-10-10"
						stroke-width="3"
						stroke-linecap="round"
					/>
				</svg>
			</div>
			<p class="result-card__status font-mono">{{ t("SENDING") }}</p>
		</div>

		<!-- Error checking status -->
		<div v-else-if="error" class="result-card">
			<div class="icon-badge icon-badge--warn">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<h1 class="result-card__title">{{ t("PAYMENT_CHECK_FAILED") }}</h1>
			<p class="result-card__desc">{{ error }}</p>
			<button class="btn btn--primary" @click="goHome">{{ t("BACK_TO_HOME") }}</button>
		</div>

		<!-- Success -->
		<div v-else-if="result?.paid" class="result-card result-card--success">
			<div class="icon-badge icon-badge--success">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="m5 13 4 4L19 7"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<h1 class="result-card__title">{{ t("PAYMENT_SUCCESS") }}</h1>
			<p class="result-card__desc">{{ t("PAYMENT_SUCCESS_DESC") }}</p>

			<div class="result-card__details" v-if="result.orderNumber || result.amount">
				<div class="detail-row" v-if="result.orderNumber">
					<span>{{ t("ORDER_NUMBER") }}</span>
					<span class="detail-row__value">{{ result.orderNumber }}</span>
				</div>
				<div class="detail-row" v-if="result.amount">
					<span>{{ t("AMOUNT_PAID") }}</span>
					<span class="detail-row__value">{{ (result.amount / 100).toLocaleString() }} AMD</span>
				</div>
			</div>

			<!-- QR ticket -->
			<div v-if="qrDataUrl" class="result-card__qr">
				<img :src="qrDataUrl" alt="Ticket QR code" width="200" height="200" />
				<p class="result-card__qr-caption">{{ t("TICKET_SENT_TO_EMAIL") }}</p>
				<a :href="qrDataUrl" download="eventnest-ticket.png" class="qr-download-link">
					{{ t("DOWNLOAD_TICKET") }}
				</a>
			</div>
			<p v-else-if="ticketError" class="result-card__qr-caption result-card__qr-caption--warn">
				{{ t("TICKET_EMAIL_FAILED") }}
			</p>

			<button class="btn btn--primary" @click="goHome">{{ t("BACK_TO_HOME") }}</button>
			<p class="result-card__redirect font-mono">
				{{ t("REDIRECTING_IN") }} {{ secondsLeft }}s
			</p>
		</div>

		<!-- Declined / not paid -->
		<div v-else class="result-card result-card--declined">
			<div class="icon-badge icon-badge--declined">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M18 6 6 18M6 6l12 12"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<h1 class="result-card__title">{{ t("PAYMENT_DECLINED") }}</h1>
			<p class="result-card__desc">
				{{ result?.errorMessage || t("PAYMENT_DECLINED_DESC") }}
			</p>
			<button class="btn btn--primary" @click="goHome">{{ t("BACK_TO_HOME") }}</button>
		</div>
	</div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap");

.result-page {
	min-height: 100dvh;
	width: 100vw;
	position: relative;
	left: 50%;
	right: 50%;
	margin-left: -50vw;
	margin-right: -50vw;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 1rem;
	background: radial-gradient(120% 100% at 50% 0%, #221a44 0%, #14102b 55%, #0f0c20 100%);
	font-family: "Inter", system-ui, sans-serif;
	box-sizing: border-box;
}

.result-card {
	width: 100%;
	max-width: 26rem;
	background: #fffcf7;
	border-radius: 1.5rem;
	padding: 2.5rem 2rem;
	text-align: center;
	box-shadow: 0 25px 60px -15px rgba(20, 16, 43, 0.45);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.result-card__title {
	font-family: "Space Grotesk", system-ui, sans-serif;
	font-size: 1.5rem;
	font-weight: 700;
	color: #1c1530;
	margin: 0.25rem 0 0.5rem;
}

.result-card__desc {
	color: #6b6480;
	font-size: 0.9rem;
	line-height: 1.5;
	margin: 0 0 1.5rem;
}

.result-card__status {
	color: #7c5cfc;
	font-size: 0.75rem;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	margin-top: 1rem;
}

.result-card__qr {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.25rem;
}

.result-card__qr img {
	border-radius: 0.75rem;
	border: 1px solid #ece7fb;
	padding: 0.5rem;
	background: #fff;
}

.result-card__qr-caption {
	color: #6b6480;
	font-size: 0.8rem;
	margin: 0.75rem 0 0.25rem;
}

.result-card__qr-caption--warn {
	color: #d99a2b;
	margin-bottom: 1.25rem;
}

.qr-download-link {
	color: #7c5cfc;
	font-size: 0.8rem;
	font-weight: 600;
	text-decoration: underline;
}

.result-card__redirect {
	color: #9d97b8;
	font-size: 0.7rem;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	margin-top: 0.9rem;
}

.icon-badge {
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 0.5rem;
}

.icon-badge svg {
	width: 1.9rem;
	height: 1.9rem;
}

.icon-badge--success {
	background: #e4f9ee;
	color: #1fa971;
}

.icon-badge--declined {
	background: #fdeceb;
	color: #ff6f4d;
}

.icon-badge--warn {
	background: #fff4e0;
	color: #d99a2b;
}

.result-card__details {
	width: 100%;
	background: #f6f3fc;
	border-radius: 0.9rem;
	padding: 0.9rem 1.1rem;
	margin-bottom: 1.5rem;
}

.detail-row {
	display: flex;
	justify-content: space-between;
	font-size: 0.8rem;
	color: #6b6480;
	padding: 0.35rem 0;
}

.detail-row__value {
	color: #1c1530;
	font-weight: 600;
}

.btn {
	width: 100%;
	padding: 0.85rem 1.5rem;
	border-radius: 999px;
	font-weight: 600;
	font-size: 0.9rem;
	cursor: pointer;
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
}

.btn--primary {
	background: linear-gradient(90deg, #7c5cfc, #6b4ce0);
	color: #fff;
	box-shadow: 0 10px 24px -8px rgba(124, 92, 252, 0.55);
}

.btn--primary:hover {
	transform: translateY(-1px) scale(1.01);
	box-shadow: 0 14px 30px -8px rgba(124, 92, 252, 0.6);
}

.btn--primary:active {
	transform: scale(0.98);
}

.spinner svg {
	width: 3rem;
	height: 3rem;
	animation: spin 0.9s linear infinite;
}

.spinner__track {
	stroke: #ece7fb;
}

.spinner__head {
	stroke: #7c5cfc;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>