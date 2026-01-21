<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n, useSwitchLocalePath } from "#imports";

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const locales = [
	{ code: "hy", name: "Հայերեն", flag: "🇦🇲" },
	{ code: "en", name: "English", flag: "🇺🇸" },
	{ code: "ru", name: "Русский", flag: "🇷🇺" },
];

const showDropdown = ref(false);

const currentLocale = computed(() =>
	locale.value.includes("-") ? locale.value.split("-")[0] : locale.value,
);

const otherLocales = computed(() => locales.filter((l) => l.code !== currentLocale.value));

const switchLanguage = async (langCode: string) => {
	showDropdown.value = false;
	await navigateTo(switchLocalePath(langCode));
};

const toggleDropdown = (event: Event) => {
	event.stopPropagation();
	showDropdown.value = !showDropdown.value;
};

const handleClickOutside = (event: MouseEvent) => {
	const el = document.querySelector(".language-switcher");
	if (el && !el.contains(event.target as Node)) {
		showDropdown.value = false;
	}
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
	<div class="relative inline-block language-switcher">
		<button
			@click="toggleDropdown"
			class="flex items-center gap-2 px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 transition"
			:aria-expanded="showDropdown"
		>
			<span
				v-html="locales.find((l) => l.code === currentLocale)?.flag"
				class="w-6 h-6 block"
			></span>
		</button>

		<div
			v-if="showDropdown"
			class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 overflow-hidden"
		>
			<button
				v-for="lang in otherLocales"
				:key="lang.code"
				@click="switchLanguage(lang.code)"
				class="w-full px-3 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left"
			>
				<span class="text-xl">{{ lang.flag }}</span>
				<span class="text-gray-800 font-medium">{{ lang.name }}</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
span > svg {
	width: 1.5rem;
	height: 1.5rem;
}
</style>
