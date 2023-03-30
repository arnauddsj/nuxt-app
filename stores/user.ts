import { User } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const user: User = reactive({ id: '', email: '', lastLogin: null })
  const isAuth = computed<boolean>(() => !!user.id)

  return { user, isAuth }
})
