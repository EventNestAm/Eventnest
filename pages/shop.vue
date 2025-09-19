<script setup>
definePageMeta({
	layout: "landing",
});
</script>
<template>
	<LandingContainer>
		<div class="flex flex-col items-center justify-center min-h-screen text-center p-8">
			<h1 class="text-3xl font-bold text-[#00308F] mb-10 ">Շուտով հասանելի կլինի</h1>
			<span class="animate-spin rounded-full h-12 w-12 border-t-4 border-[#00308F]"></span>
			<LandingLink
				class="rounded-full bg-transparent border-black text-black hover:border-[#00308F] hover:bg-[#00308F] hover:text-white font-bold mt-10"
				size="lg"
				styleName="outline"
				rel="noopener"
				href="/"
				target=""
				>Վերադառնալ գլխավոր էջ</LandingLink
			>
		</div>
	</LandingContainer>
</template>
