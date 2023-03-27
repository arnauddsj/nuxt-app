export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)

  return { isLogin }
})
