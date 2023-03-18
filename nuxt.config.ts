// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-security', '@nuxt/devtools'],
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
  extends: [
    './auth'
  ]
})
