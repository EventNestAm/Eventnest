<!-- pages/[locale]/scan.vue -->
<script setup>
import { Html5Qrcode } from "html5-qrcode";

const result = ref(null); // { valid, reason, name, orderNumber }
const scanning = ref(false);
let scanner = null;

async function handleScan(decodedText) {
	if (!scanning.value) return;
	scanning.value = false;
	await scanner?.pause(true);

	try {
		result.value = await $fetch("/api/tickets/verify", {
			method: "POST",
			body: { qrContent: decodedText },
		});
	} catch (err) {
		result.value = { valid: false, reason: "ERROR" };
	}
}

function resumeScanning() {
	result.value = null;
	scanning.value = true;
	scanner?.resume();
}

onMounted(async () => {
	scanner = new Html5Qrcode("qr-reader");
	scanning.value = true;
	await scanner.start(
		{ facingMode: "environment" },
		{ fps: 10, qrbox: 250 },
		handleScan,
		() => {}, // ignore per-frame scan failures
	);
});

onUnmounted(() => {
	scanner?.stop().catch(() => {});
});
</script>

<template>
	<div class="scan-page">
		<div id="qr-reader" style="width: 100%; max-width: 400px; margin: 0 auto;"></div>

		<div v-if="result" class="scan-result" :class="result.valid ? 'ok' : 'fail'">
			<h2 v-if="result.valid">✅ Valid — {{ result.name }}</h2>
			<h2 v-else>
				❌
				{{
					{
						FORGED: "Invalid ticket",
						ALREADY_USED: `Already scanned${result.name ? " — " + result.name : ""}`,
						NOT_FOUND: "Order not found",
						MALFORMED: "Unreadable QR",
						ERROR: "Scan error, try again",
					}[result.reason] || "Invalid"
				}}
			</h2>
			<button @click="resumeScanning">Scan next</button>
		</div>
	</div>
</template>