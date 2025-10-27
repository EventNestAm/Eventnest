import { ref } from 'vue'
import { useRouter } from 'vue-router'

const tokenKey = 'auth_token'

export const useAuth = () => {
	const router = useRouter()
	const token = ref<string | null>(null)

	// Only access localStorage on the client
	if (process.client) {
		token.value = localStorage.getItem(tokenKey)
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
		}
		router.push('/login')
	}

	const isLoggedIn = () => !!token.value

	return { token, login, register, logout, isLoggedIn }
}
