import { User } from '~/types/auth'

export const useUserStore = defineStore('user', () => {
  const user: User = reactive({ id: '', email: '', lastLogin: null })

  const isAuth = computed<boolean>(() => !!user.id)

  // const setUser = (user: User) => { user = user } d

  return { user, isAuth }
})
