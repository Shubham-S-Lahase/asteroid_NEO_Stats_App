export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt-echarts',
  ],
  echarts: {
    charts: ['LineChart'],
    components: ['TitleComponent', 'TooltipComponent', 'GridComponent']
  },
  runtimeConfig: {
    public: {
      nasaApiKey: process.env.NASA_API_KEY || 'DEMO_KEY',
    },
  },
  css: ['~/assets/css/tailwind.css'],
})
