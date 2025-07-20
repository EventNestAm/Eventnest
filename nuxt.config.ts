export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css', '~/assets/css/nprogress.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/ui', '@nuxt/image',],
  //  '@nuxtjs/gtm'
  // , '@nuxtjs/sitemap'
  // sitemap: {
  //   hostname: 'https://eventnest.am',
  //   gzip: true,
  // },
  // gtm: {
  //   id: 'GTM-TZDK52SP',
  //   debug: false,
  //   enabled: true,
  // },
  image: {
    format: ['webp'],
    screens: {
      'xs': 0,
      'sm': 501,
      'md': 769,
      'lg': 1025,
      'xl': 1441,
    },
  },
});