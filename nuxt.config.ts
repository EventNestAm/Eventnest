export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css', '~/assets/css/nprogress.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-simple-sitemap'],
  site: {
    url: 'https://www.eventnest.am',

    sitemap: {
      routes: [
        '/about',
        '/upcoming-events',
        '/shop',
        '/contact',
        '/events/1',
        '/events/2',
        '/events/3',
        '/events/4',
        '/events/5',
        '/events/6',
        '/events/7',
        '/events/8'
      ],
      defaults: {
        changefreq: 'weekly',
        priority: 0.8
      }
    }
  },

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