<template>
    <div class="goUp">
        <div class="privacy-container">
            <h1>{{ $t('privacy.title') }}</h1>
            <p class="updated">
                {{ $t('privacy.lastUpdated') }} 
                <span class="placeholder">25.07.2026</span>
            </p>

            <p>
                {{ $t('privacy.intro.part1') }}
                <span class="placeholder">https://www.eventnest.am</span>
                {{ $t('privacy.intro.part2') }}
            </p>

            <h2>{{ $t('privacy.s1.title') }}</h2>
            <p>{{ $t('privacy.s1.desc') }}</p>
            <ul>
                <li>{{ $t('privacy.s1.item1') }}</li>
                <li>{{ $t('privacy.s1.item2') }}</li>
                <li>{{ $t('privacy.s1.item3') }}</li>
                <li>{{ $t('privacy.s1.item4') }}</li>
                <li>{{ $t('privacy.s1.item5') }}</li>
            </ul>

            <h2>{{ $t('privacy.s2.title') }}</h2>
            <ul>
                <li>{{ $t('privacy.s2.item1') }}</li>
                <li>{{ $t('privacy.s2.item2') }}</li>
                <li>{{ $t('privacy.s2.item3') }}</li>
                <li>{{ $t('privacy.s2.item4') }}</li>
            </ul>

            <h2>{{ $t('privacy.s3.title') }}</h2>
            <ul>
                <li>{{ $t('privacy.s3.item1') }}</li>
                <li>{{ $t('privacy.s3.item2') }}</li>
                <li>{{ $t('privacy.s3.item3') }}</li>
                <li>{{ $t('privacy.s3.item4') }}</li>
                <li>{{ $t('privacy.s3.item5') }}</li>
            </ul>

            <h2>{{ $t('privacy.s4.title') }}</h2>
            <p>{{ $t('privacy.s4.desc') }}</p>
            <ul>
                <li>{{ $t('privacy.s4.item1') }}</li>
                <li>{{ $t('privacy.s4.item2') }}</li>
            </ul>

            <h2>{{ $t('privacy.s5.title') }}</h2>
            <p>{{ $t('privacy.s5.desc') }}</p>

            <h2>{{ $t('privacy.s6.title') }}</h2>
            <p>{{ $t('privacy.s6.desc') }}</p>

            <h2>{{ $t('privacy.s7.title') }}</h2>
            <p>{{ $t('privacy.s7.desc') }}</p>
            <ul>
                <li>{{ $t('privacy.s7.item1') }}</li>
                <li>{{ $t('privacy.s7.item2') }}</li>
                <li>{{ $t('privacy.s7.item3') }}</li>
                <li>{{ $t('privacy.s7.item4') }}</li>
            </ul>
            <p>{{ $t('privacy.s7.contactText') }}</p>

            <h2>{{ $t('privacy.s8.title') }}</h2>
            <p><strong>{{ $t('privacy.s8.cancellationTitle') }}:</strong> {{ $t('privacy.s8.cancellationDesc') }}</p>
            <p><strong>{{ $t('privacy.s8.userCancellationTitle') }}:</strong> {{ $t('privacy.s8.userCancellationDesc') }}</p>
            <ul>
                <li>{{ $t('privacy.s8.item1') }}</li>
                <li>{{ $t('privacy.s8.item2') }}</li>
            </ul>
            <p><strong>{{ $t('privacy.s8.processTitle') }}:</strong> {{ $t('privacy.s8.processDesc') }}</p>

            <h2>{{ $t('privacy.s9.title') }}</h2>
            <p>{{ $t('privacy.s9.desc') }}</p>

            <h2>{{ $t('privacy.s10.title') }}</h2>
            <p>{{ $t('privacy.s10.desc') }}</p>
            <ul>
                <li>{{ $t('privacy.s10.email') }}: <span class="placeholder">eventnest.am@gmail.com</span></li>
                <li>{{ $t('privacy.s10.phone') }}: <span class="placeholder">+374 96 00 00 99</span></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();

useHead({
    title: t("privacy.title"),
});

useSeoMeta({
    title: t("SEO_PRIVACY_TITLE"),
    description: t("SEO_PRIVACY_DESCRIPTION"),
    ogTitle: t("SEO_PRIVACY_TITLE"),
    ogDescription: t("SEO_PRIVACY_DESCRIPTION"),
    ogUrl: () => `https://www.eventnest.am${route.path}`,
    ogImage: "https://www.eventnest.am/og/eventnest-og.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: "summary_large_image",
});

useHead({
    link: [{ rel: "canonical", href: () => `https://www.eventnest.am${route.path}` }],
});

definePageMeta({
    layout: "landing",
});
</script>

<style scoped>
.privacy-container {
    max-width: 780px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    line-height: 1.7;
    color: #1f2328;
}
h1 {
    font-size: 2rem;
    margin-bottom: 4px;
}
.goUp {
    padding: 2.5rem 1rem;
}
.updated {
    color: #57606a;
    font-size: 0.95rem;
    margin-bottom: 32px;
}
h2 {
    font-size: 1.25rem;
    margin-top: 40px;
    padding-bottom: 8px;
    border-bottom: 1px solid #d8dee4;
}
ul {
    padding-inline-start: 22px;
}
.placeholder {
    background: #fff7e6;
    border: 1px solid #f0c36d;
    border-radius: 4px;
    padding: 0 4px;
}
</style>