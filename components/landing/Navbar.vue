<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const menuitems = computed(() => [
	{ title: t("HOME_PAGE"), path: localePath("/") },
	{ title: t("ABOUT"), path: localePath("/about") },
	{ title: t("UPCOMING_EVENTS"), path: localePath("/upcoming-events") },
	{ title: t("PRIVACY_POLICE"), path: localePath("/privacy-policy") },
	{ title: t("CONTACT"), path: localePath("/contact") },
]);

const open = ref(false);
const clickedPath = ref(null);

const handleClick = (path) => {
	clickedPath.value = path;
	open.value = false;
};

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};
</script>

<template>
	<div class="navbar">
		<LandingContainer>
			<header class="flex flex-col lg:flex-row justify-between items-center py-2 lg:py-0">
				<div class="flex w-full lg:w-auto items-center justify-between">
					<NuxtLink href="/" class="inline-flex items-center gap-2" @click="scrollToTop">
						<img
							src="/eventnest.png"
							width="100"
							height="100"
							alt="միջոցառումների կազմակերպում EventNest"
							class="w-12 h-12 lg:w-14 lg:h-14 object-cover rounded-xl"
						/>
						<span class="navbar__wordmark font-display hidden sm:inline"
							>EventNest</span
						>
					</NuxtLink>

					<div class="lg:hidden flex items-center justify-center gap-4">
						<LanguageSwitcher />

						<button @click="open = !open" class="navbar__burger">
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
					<ul class="flex flex-col lg:flex-row lg:gap-1 lg:items-center">
						<li v-for="item of menuitems" :key="item.path">
							<NuxtLink
								:to="item.path"
								@click="handleClick(item.path)"
								class="navbar__link"
								:class="{ 'navbar__link--active': route.path === item.path }"
							>
								{{ item.title }}
							</NuxtLink>
						</li>
					</ul>
				</nav>

				<div class="hidden lg:flex items-center gap-5">
					<LanguageSwitcher />
				</div>
			</header>
		</LandingContainer>

		<div class="navbar__perforation" aria-hidden="true"></div>
	</div>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}

.navbar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 50;
	background: rgba(255, 252, 247, 0.85);
	backdrop-filter: blur(14px);
	box-shadow: 0 8px 30px -16px rgba(20, 16, 43, 0.18);
}

.navbar__wordmark {
	font-weight: 700;
	font-size: 1.05rem;
	color: #1c1530;
	letter-spacing: -0.01em;
}

.navbar__burger {
	width: 2.25rem;
	height: 2.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.6rem;
	background: #f6f3fc;
	color: #1c1530;
	transition: background 0.2s ease;
}
.navbar__burger:hover {
	background: #efe9ff;
}

.navbar__link {
	display: flex;
	padding: 0.6rem 0.9rem;
	border-radius: 0.6rem;
	color: #4a4360;
	font-weight: 600;
	font-size: 0.92rem;
	transition:
		color 0.2s ease,
		background 0.2s ease;
}

.navbar__link:hover {
	color: #1c1530;
	background: #f6f3fc;
}

.navbar__link--active {
	color: #7c5cfc;
	background: #efe9ff;
}

/* Subtle ticket-tear edge along the bottom of the bar, ties the nav to the rest of the site */
.navbar__perforation {
	height: 0;
	border-top: 2px dashed rgba(124, 92, 252, 0.18);
}
</style>
