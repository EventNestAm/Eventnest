import { eventSlugs } from './data/event-slugs'

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css', '~/assets/css/nprogress.css', '@vuepic/vue-datepicker/dist/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/sitemap', "@nuxtjs/i18n"],
  site: {
    url: 'https://www.eventnest.am',
  },

  sitemap: {
    urls: () => {
      const staticPages = ['/', '/about', '/upcoming-events', '/shop', '/contact', '/prices'];
      return [...staticPages, ...eventSlugs.map((slug) => `/events/${slug}`)];
    },
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
    },
  },

  i18n: {
    restructureDir: false,
    defaultLocale: "hy",
    strategy: "prefix",
    lazy: false,
    langDir: "locales/",
    skipSettingLocaleOnNavigate: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
    },
    locales: [
      { code: "hy", language: "hy-AM", name: "Հայերեն", file: "hy.json", },
      { code: "en", language: "en-US", name: "English", file: "en.json", },
      { code: "ru", language: "ru-RU", name: "Русский", file: "ru.json", },
    ],
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

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    }
  }
});