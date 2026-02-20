<script setup>
const { t } = useI18n();
import ModernSwiper from "@/components/ModernSwiper.vue";
</script>

<template>
	<div class="mt-10 pb-2">
		<ModernSwiper />

		<p class="my-5 text-gray-800 lg:px-40 w-full mx-auto font-medium px-5">
			{{ t("EVENTNEST_DESC") }}
			<span class="text-purple-600 font-semibold">73 Club</span
			>{{ t("EVENTNEST_DESC_FIRST") }}։
		</p>

		<p class="my-5 text-gray-800 lg:px-40 w-full mx-auto font-medium px-5">
			{{ t("EVENTNEST_DESC_SECOND") }}
			<span class="text-purple-600 font-semibold">Trendi Salon</span>
			{{ t("EVENTNEST_DESC_THIRD") }}
			<span class="text-purple-600 font-semibold">Trendi Bijoux</span>
			{{ t("EVENTNEST_DESC_FOURTH") }}
			<span class="text-purple-600 font-semibold">Kechi House 132</span>
			{{ t("EVENTNEST_DESC_FIVE") }}
		</p>
	</div>
</template>

<style scoped>
@media (min-width: 1024px) {
	.mySwiper {
		height: 500px;
	}
}
</style>
