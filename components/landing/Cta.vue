<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
	<div
		class="px-20 py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center bg-[#00308F]"
	>
		<h2 class="text-white text-2xl sm:text-xl md:text-5xl font-bold uppercase">
			{{ t("YOUR_EVENT") }}
		</h2>

		<div class="flex mt-5 md:mt-10">
			<LandingLink
				class="rounded-full bg-transparent !border-white text-white hover:bg-white hover:text-[#00308F] font-bold mt-10"
				size="lg"
				styleName="outline"
				rel="noopener"
				:to="localePath('/contact')"
				target=""
				>{{ t("JOIN_US") }}</LandingLink
			>
		</div>
	</div>
</template>
