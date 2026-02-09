export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css', '~/assets/css/nprogress.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-simple-sitemap', "@nuxtjs/i18n"],
  site: {
    url: 'https://www.eventnest.am',

    sitemap: {
      routes: [
        '/about',
        '/upcoming-events',
        '/shop',
        '/contact',
        '/events/kargin-haxordman-viktorina-1',
        '/events/futbolayin-1',
        '/events/erajshtakan-1',
        '/events/inch-vortex-erb-1',
        '/events/kino-viktorina-1',
        '/events/kargin-haxordman-viktorina-2',
        '/events/kargin-haxordman-viktorina-3',
        '/events/kino-viktorina-2',
        '/events/kargin-haxordman-viktorina-4',
      ],
      defaults: {
        changefreq: 'weekly',
        priority: 0.8
      }
    }
  },

  i18n: {
    defaultLocale: "hy",
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    locales: [
      { code: "hy", iso: "hy-AM", name: "Հայերեն", file: "hy.json", },
      { code: "en", iso: "en-US", name: "English", file: "en.json", },
      { code: "ru", iso: "ru-RU", name: "Русский", file: "ru.json", },
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
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ]
    }
  }
});