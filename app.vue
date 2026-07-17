<script setup>
import { Analytics } from "@vercel/analytics/nuxt";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();
const { t } = useI18n();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();

const currentLocaleData = computed(() => locales.value.find((l) => l.code === locale.value));

useSeoMeta({
    title: () => t("SEO_HOME_TITLE"),
    description: () => t("SEO_HOME_DESCRIPTION"),
    ogTitle: () => t("SEO_HOME_TITLE"),
    ogDescription: () => t("SEO_HOME_DESCRIPTION"),
    ogImage: "https://www.eventnest.am/og/eventnest-og.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: () => `https://www.eventnest.am${route.path}`,
    ogLocale: () => currentLocaleData.value?.iso?.replace("-", "_") ?? "hy_AM",
    ogLocaleAlternate: () =>
        locales.value
            .filter((l) => l.code !== locale.value)
            .map((l) => l.iso?.replace("-", "_"))
            .filter(Boolean),
    twitterCard: "summary_large_image",
    twitterTitle: () => t("SEO_HOME_TITLE"),
    twitterDescription: () => t("SEO_HOME_DESCRIPTION"),
    twitterImage: "https://www.eventnest.am/og/eventnest-og.jpg",
});

useHead({
    htmlAttrs: {
        lang: computed(() => currentLocaleData.value?.iso || "hy"),
    },
    link: [
        { rel: "canonical", href: `https://www.eventnest.am${route.path}` },
        ...locales.value.map((l) => ({
            rel: "alternate",
            hreflang: l.iso,
            href: `https://www.eventnest.am${switchLocalePath(l.code)}`,
        })),
        {
            rel: "alternate",
            hreflang: "x-default",
            href: `https://www.eventnest.am${switchLocalePath("hy")}`,
        },
    ],
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "Organization",
                        "@id": "https://www.eventnest.am/#organization",
                        name: "EventNest",
                        url: "https://www.eventnest.am",
                        logo: "https://www.eventnest.am/eventnestLogo.png",
                    },
                    {
                        "@type": "WebSite",
                        "@id": "https://www.eventnest.am/#website",
                        url: "https://www.eventnest.am",
                        name: "EventNest",
                        publisher: { "@id": "https://www.eventnest.am/#organization" },
                    },
                ],
            }),
        },
        // ⬇️ META PIXEL INJECTION ADDED HERE ⬇️
        {
            type: "text/javascript",
            innerHTML: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '984092637950862');
                fbq('track', 'PageView');
            `
        }
    ],
    // ⬇️ NOSCRIPT BACKUP FOR USERS WITH JAVASCRIPT DISABLED ⬇️
    noscript: [
        {
            innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=984092637950862&ev=PageView&noscript=1" />`,
            tagPosition: "bodyClose"
        }
    ]
});
const showScroll = ref(false);

const checkScroll = () => {
    showScroll.value = window.scrollY > 300;
};

onMounted(() => {
    window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", checkScroll);
});

const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
    <NuxtLayout>
        <div class="min-h-screen">
            <NuxtPage />

            <transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="opacity-0 translate-y-5 scale-90"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 translate-y-5 scale-90"
            >
                <div v-if="showScroll" class="fixed bottom-6 right-6 z-50">
                    <button
                        @click.prevent="goTop"
                        class="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-indigo-500/50 transition-all duration-500 transform hover:-translate-y-2 active:scale-95"
                    >
                        <span
                            class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 opacity-60 blur-md group-hover:opacity-100 transition-all duration-500"
                        ></span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2.3"
                            stroke="white"
                            class="relative w-7 h-7 group-hover:-translate-y-1 transition-transform duration-300"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                </div>
            </transition>
        </div>
    </NuxtLayout>
</template>