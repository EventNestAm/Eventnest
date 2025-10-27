import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const tokenKey = 'auth_token'

export const useAuth = () => {
  const token = ref<string | null>(null)
  let router: ReturnType<typeof useRouter> | null = null

  if (process.client) {
    token.value = localStorage.getItem(tokenKey)
    router = useRouter() 
  }

  const login = async (email: string, password: string) => {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (!res.success) throw new Error(res.message)

    token.value = res.token
    if (process.client) {
      localStorage.setItem(tokenKey, res.token)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name, email, password },
    })

    if (!res.success) throw new Error(res.message)
  }

  const logout = () => {
    token.value = null
    if (process.client) {
      localStorage.removeItem(tokenKey)
      router?.push('/login')
    }
  }

  const isLoggedIn = () => !!token.value

  return { token, login, register, logout, isLoggedIn }
}
