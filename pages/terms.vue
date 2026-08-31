<template>
  <div class="goUp">
    <div class="terms-container">
      <h1>{{ $t("terms.title") }}</h1>
      <p class="updated">
        {{ $t("terms.lastUpdated") }}
        <span class="placeholder">25.07.2026</span>
      </p>

      <!-- Section 1: Packages & Services -->
      <h2>{{ $t("terms.s1.title") }}</h2>
      <p>{{ $t("terms.s1.desc") }}</p>
      <ul>
        <li>{{ $t("terms.s1.item1") }}</li>
        <li>{{ $t("terms.s1.item2") }}</li>
        <li>{{ $t("terms.s1.item3") }}</li>
        <li>{{ $t("terms.s1.item4") }}</li>
        <li>{{ $t("terms.s1.item5") }}</li>
      </ul>
      <div class="notice">
        {{ $t("terms.s1.warning") }}
      </div>

      <!-- Section 2: Venue & Entry Procedures -->
      <h2>{{ $t("terms.s2.title") }}</h2>
      <p>{{ $t("terms.s2.desc") }}</p>

      <!-- Section 3: Refunds, Exchanges & Cancellations -->
      <h2>{{ $t("terms.s3.title") }}</h2>
      <p>{{ $t("terms.s3.desc") }}</p>

      <!-- Section 4: Contact & Disputes -->
      <h2>{{ $t("terms.s4.title") }}</h2>
      <p>{{ $t("terms.s4.desc") }}</p>
      <div class="contact-box">
        <p><strong>Email:</strong> eventnestinfo@gmail.com</p>
        <p><strong>Phone:</strong> +374 96 000099</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();

useHead({
  title: t("terms.title"),
});

useSeoMeta({
  title: t("SEO_TERMS_TITLE"),
  description: t("SEO_TERMS_DESCRIPTION"),
  ogTitle: t("SEO_TERMS_TITLE"),
  ogDescription: t("SEO_TERMS_DESCRIPTION"),
  ogUrl: () => `https://www.eventnest.am${route.path}`,
  ogImage: "https://www.eventnest.am/og/eventnest-og.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: () => `https://www.eventnest.am${route.path}` }],
});

definePageMeta({ layout: "landing" });
</script>

<style scoped>
.terms-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  line-height: 1.7;
  color: #1f2328;
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
  padding-left: 20px;
  margin: 12px 0;
}
li {
  margin-bottom: 6px;
}
.placeholder {
  background: #fff7e6;
  border: 1px solid #f0c36d;
  border-radius: 4px;
  padding: 0 4px;
}
.notice {
  background-color: #fff8f5;
  border-left: 4px solid #fd8c73;
  padding: 12px 16px;
  margin-top: 16px;
  border-radius: 0 6px 6px 0;
  font-size: 0.95rem;
}
.contact-box {
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  padding: 16px;
  border-radius: 6px;
  margin-top: 16px;
}
.contact-box p {
  margin: 4px 0;
}
.goUp {
  padding: 2.5rem 1rem;
}
</style>