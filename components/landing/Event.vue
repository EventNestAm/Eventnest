<script setup>
const { t } = useI18n();
import ModernSwiper from "@/components/ModernSwiper.vue";
</script>

<template>
	<div class="mt-10 pb-2">
		<ModernSwiper />

		<p class="my-5 text-gray-800 lg:px-40 w-full mx-auto font-medium px-5 whitespace-pre-line">
			{{ t("EVENTNEST_EXPERIENCE") }}
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
