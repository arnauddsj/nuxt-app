// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-security', '@nuxt/devtools', '@vueuse/nuxt', '@sidebase/nuxt-auth', '@pinia/nuxt'],
  security: {
    headers: {
      contentSecurityPolicy: process.env.NODE_ENV !== 'development'
    }
  },
  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    vscode: {}
    // ...other options
  },
  auth: {
    isEnabled: true,
    // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
    origin: process.env.AUTH_ORIGIN,
    basePath: '/api/auth',
    enableGlobalAppMiddleware: true
  },
  imports: {
    dirs: ['stores']
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  }
})
