<script setup>
const route = useRoute();
const menuitems = [
	{
		title: "Գլխավոր էջ",
		path: "/",
	},

	{
		title: "Մեր Մասին",
		path: "/about",
	},
	{
		title: "Գալիք միջոցառումներ",
		path: "/upcoming-events",
	},
	{
		title: "Խանութ",
		path: "/shop",
	},
	{
		title: "Կապ",
		path: "/contact",
	},
];

const open = ref(false);
const clickedPath = ref(null);

const handleClick = (path) => {
	clickedPath.value = path;
	open.value = false;
};
</script>

<template>
	<div class="w-full fixed top-0 left-0 z-50 bg-white shadow-lg">
		<LandingContainer>
			<header class="flex flex-col lg:flex-row justify-between items-center">
				<div class="flex w-full lg:w-auto items-center justify-between">
					<NuxtLink href="/" class="inline-block">
						<img
							src="/eventnest.png"
							width="100"
							height="100"
							alt="Home Logo"
							class="w-24 h-24 object-cover"
						/>
					</NuxtLink>

					<div class="lg:hidden w-24 h-24 flex items-center justify-center">
						<button @click="open = !open" class="text-gray-800">
							<svg
								fill="currentColor"
								class="w-4 h-4"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Menu</title>
								<path
									v-show="open"
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
								></path>
								<path
									v-show="!open"
									fill-rule="evenodd"
									d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
								></path>
							</svg>
						</button>
					</div>
				</div>
				<nav
					class="w-full lg:w-auto mt-2 lg:flex lg:mt-0"
					:class="{ block: open, hidden: !open }"
				>
					<ul class="flex flex-col lg:flex-row lg:gap-3">
						<li v-for="item of menuitems" :key="item.path">
							<NuxtLink
								:to="item.path"
								@click="handleClick(item.path)"
								:class="[
									'flex lg:px-3 py-2 text-black hover:text-[#00308F] font-bold',
									route.path === item.path
										? 'underline underline-offset-8 decoration-2 decoration-[#00308F]'
										: '',
								]"
							>
								{{ item.title }}
							</NuxtLink>
						</li>
					</ul>
					<div class="lg:hidden flex items-center mt-3 gap-4">
						<LandingLink href="#" styleName="muted" block size="md">Մուտք</LandingLink>
						<LandingLink href="#" size="md" block>Գրանցվել</LandingLink>
					</div>
				</nav>
				<div>
					<div class="hidden lg:flex items-center gap-4">
						<a class="cursor-not-allowed">Մուտք</a>
						<LandingLink class="cursor-not-allowed" size="md">Գրանցվել</LandingLink>
					</div>
				</div>
			</header>
		</LandingContainer>
	</div>
</template>
