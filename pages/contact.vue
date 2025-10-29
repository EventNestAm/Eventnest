<script setup>
definePageMeta({
	layout: "landing",
});
</script>

<template>
	<LandingContainer>
		<LandingSectionhead>
			<template v-slot:title
				><h1 class="text-black uppercase text-xl sm:text-2xl md:text-3xl  font-bold pt-32 sm:pt-28">
					Կապ մեզ հետ
				</h1></template
			>
		</LandingSectionhead>

		<div class="grid md:grid-cols-2 gap-10 mx-auto max-w-[99.75rem] mt-4 md:mt-12 lg:mt-16">
			<div>
				<h2 class="font-medium text-2xl text-gray-800"></h2>
				<p class="text-lg leading-relaxed text-black mt-3 max-w-2xl">
					Ցանկանու՞մ եք կազմակերպել բացառիկ իրադարձություն EventNest-ի հետ։ Ուղարկեք ձեր
					հարցումը հիմա, և մենք կպատասխանենք շուտով։
				</p>
				<div class="mt-5">
					<div class="flex items-center mt-2 space-x-2 text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="2em"
							height="2em"
							viewBox="0 0 24 24"
							class="text-black"
						>
							<path
								fill="currentColor"
								d="M18.175 17H15q-.425 0-.712-.288T14 16t.288-.712T15 15h3.175l-.9-.9Q17 13.825 17 13.413t.3-.713q.275-.275.7-.275t.7.275l2.6 2.6q.125.125.2.312t.075.388t-.075.387t-.2.313l-2.6 2.6q-.275.275-.687.288T17.3 19.3q-.275-.275-.275-.7t.275-.7zM10.4 11L17 7.15V5h-.25L10.4 8.675L4.225 5H4v2.2zm-6.525 6q-.775 0-1.325-.55T2 15.125V4.875q0-.775.55-1.325T3.875 3h13.25q.775 0 1.325.55T19 4.875V9.2q0 .35-.275.6t-.625.225q-1.225-.05-2.337.4t-1.988 1.325t-1.338 2t-.412 2.35q.025.35-.225.625t-.6.275z"
							/>
						</svg>

						<a class="text-black" href="mailto:eventnest.am@gmail.com"
							>eventnest.am@gmail.com</a
						>
					</div>
					<div class="flex items-center mt-2 space-x-2 text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="2em"
							height="2em"
							viewBox="0 0 24 24"
							class="text-black"
						>
							<path
								fill="currentColor"
								d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3m-1.8-14H14q-.425 0-.712-.288T13 6t.288-.712T14 5h4.15l-.85-.85q-.275-.275-.288-.687t.263-.713q.3-.3.725-.312t.725.287L21.3 5.35q.3.3.3.7t-.3.7L18.7 9.3q-.3.275-.7.275t-.7-.275q-.3-.3-.312-.712t.287-.713z"
							/>
						</svg>

						<a class="text-black" href="tel:+37496000099">+374 96 00 00 99</a>
					</div>
				</div>
			</div>
			<div>
				<LandingContactform />
			</div>
		</div>
	</LandingContainer>
</template>
