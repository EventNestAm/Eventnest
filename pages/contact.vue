<script setup>
definePageMeta({
	layout: "landing",
});
</script>

<template>
	<LandingContainer>
		<LandingSectionhead>
			<template v-slot:title
				><h1
					class="text-black uppercase text-xl sm:text-2xl md:text-3xl font-bold pt-32 sm:pt-28"
				>
					Կապ մեզ հետ
				</h1></template
			>
		</LandingSectionhead>

		<div class="grid md:grid-cols-2 gap-10 mx-auto max-w-[99.75rem] mt-4 md:mt-12 lg:mt-16">
			<div>
				<p class="text-lg leading-relaxed text-black mt-6 max-w-2xl">
					EventNest-ը կվերածի ձեր գաղափարը կատարյալ միջոցառման։ Ուղարկեք ձեր հարցումը, և
					մենք կապ կհաստատենք ամենասեղմ ժամկետում։
				</p>
				<ul class="mt-6 space-y-3 text-lg text-black">
					<li>• Կորպորատիվ և թիմային միջոցառումներ</li>
					<li>• Վիկտորինաներ / Զվարճալի ֆորմատներ</li>
					<li>• Բրենդավորված միջոցառումներ և հովանավորություն</li>
					<li>• Անհատական միջոցառումների կազմակերպում</li>
				</ul>
				<PersonCounts />
			</div>
			<div class="rounded-2xl p-4 md:p-6">
				<LandingContactform />
				<p class="text-sm text-gray-600 mt-4 flex justify-end">
					Մենք պատասխանում ենք 24 ժամվա ընթացքում։ Ձեր տվյալները անվտանգ են։
				</p>
				<div class="max-w-lg mx-auto mt-6">
					<div class="mt-6 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
						<div class="flex items-center mt-2 space-x-2 text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="w-4 h-4"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="2.5" y="5" width="19" height="14" rx="3" />
								<path d="M3.5 6.5l8.5 6 8.5-6" />
							</svg>

							<a class="text-black" href="mailto:eventnest.am@gmail.com"
								>eventnest.am@gmail.com</a
							>
						</div>
						<div class="flex items-center mt-2 space-x-2 text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="w-4 h-4"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M5 4.5h4l1.5 4-2.5 2.5a14 14 0 006 6l2.5-2.5 4 1.5v4c0 1-1 2-2 2C9 22 2 15 2 6c0-1 1-2 2-2z"
								/>
							</svg>

							<a class="text-black" href="tel:+37496000099">+374 96 00 00 99</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</LandingContainer>
</template>
