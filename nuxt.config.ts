import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: [
        '@number-flow/vue',
        '@vueuse/core',
        'tailwind-variants',
        'torph'
      ]
    },
    plugins: [tailwindcss()]
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'reka-ui/nuxt'
  ],
  fonts: {
    defaults: {
      weights: ['100 900']
    }
  },
  icon: {
    mode: 'svg'
  }
})
