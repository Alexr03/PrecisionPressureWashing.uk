// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
  },

  css: [
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  site: {
    url: 'https://precisionpressurewashing.uk',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      title: 'Precision Pressure Washing | Driveway & Patio Cleaning Experts',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Professional pressure washing services across Basildon & Essex. Driveways, patios, paths & decking. Fully insured, free quotes. Call 07912 606539.',
        },
        { name: 'theme-color', content: '#0a1628' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Precision Pressure Washing' },
        { property: 'og:title', content: 'Precision Pressure Washing | Driveway & Patio Cleaning Experts' },
        {
          property: 'og:description',
          content: 'Professional pressure washing services across Basildon & Essex. Driveways, patios, paths & decking. Fully insured, free quotes. Call 07912 606539.',
        },
        { property: 'og:image', content: 'https://precisionpressurewashing.uk/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:url', content: 'https://precisionpressurewashing.uk' },
        { property: 'og:locale', content: 'en_GB' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Precision Pressure Washing | Driveway & Patio Cleaning Experts' },
        {
          name: 'twitter:description',
          content: 'Professional pressure washing services across Basildon & Essex. Driveways, patios, paths & decking. Fully insured, free quotes. Call 07912 606539.',
        },
        { name: 'twitter:image', content: 'https://precisionpressurewashing.uk/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://precisionpressurewashing.uk' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
})
