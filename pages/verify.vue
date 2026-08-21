<script setup>
const route = useRoute();
const status = ref("checking"); // checking | ok | fail
const result = ref(null);

onMounted(async () => {
	const { t, o, e } = route.query;

	if (!t || !o || !e) {
		status.value = "fail";
		result.value = { reason: "MALFORMED" };
		return;
	}

	const qrContent = `EVENTNEST|${t}|${o}|${e}`;

	try {
		const res = await $fetch("/api/tickets/verify", {
			method: "POST",
			body: { qrContent },
		});
		result.value = res;
		status.value = res.valid ? "ok" : "fail";
	} catch (err) {
		result.value = { reason: "ERROR" };
		status.value = "fail";
	}
});

const reasonText = computed(() => {
	const reasons = {
		FORGED: "Այս տոմսը վավեր չէ։",
		ALREADY_USED: "Այս տոմսն արդեն օգտագործված է։",
		NOT_FOUND: "Պատվերը չի գտնվել։",
		MALFORMED: "Անընթեռնելի QR կոդ։",
		ERROR: "Ստուգման սխալ, փորձեք կրկին։",
	};
	return reasons[result.value?.reason] || "Անվավեր տոմս։";
});
</script>

<template>
	<div class="verify-page">
		<div v-if="status === 'checking'" class="state checking">
			<p>Ստուգվում է…</p>
		</div>

		<div v-else-if="status === 'ok'" class="state ok">
			<h1>✅ Վավեր տոմս</h1>
			<p v-if="result?.name">Բարի գալուստ, {{ result.name }}</p>
		</div>

		<div v-else class="state fail">
			<h1>❌ {{ reasonText }}</h1>
		</div>
	</div>
</template>

<style scoped>
.verify-page {
	min-height: 60vh;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 2rem;
}
.state.ok h1 {
	color: #16a34a;
}
.state.fail h1 {
	color: #dc2626;
}
</style>