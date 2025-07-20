<script setup lang="ts"></script>

<template>
	<main class="grid lg:grid-cols-2 place-items-center pb-8 pt-32 sm:pt-28 lg:pt-8">
		<div class="mb-5 sm:mb-0 md:p-24 md:order-1">
			<img
				class="rounded-full transition-transform transform md:hover:scale-125"
				src="~/assets/img/ourPicture.jpg"
				alt="Starship starts the engine"
				loading="eager"
				width="512"
				height="512"
				fetchpriority="high"
			/>
		</div>

		<div>
			<h1
				class="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight text-black"
			>
				EventNest
			</h1>
			<p class="text-lg mt-2 sm:mt-4 text-black max-w-xl font-medium">
				EventNest – միայն ջերմ ու դրական զգացողություններ՝ մեզ հետ։
			</p>
			<div class="mt-6">
				<LandingLink
					class="rounded-full bg-transparent border-black text-black hover:bg-black hover:text-white font-bold"
					size="lg"
					styleName="outline"
					rel="noopener"
					href="/contact"
					target=""
					>Միացիր Մեզ</LandingLink
				>
			</div>
		</div>
	</main>
</template>
