<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      <h2 class="text-2xl font-bold mb-6">Register</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input v-model="name" type="text" placeholder="Name" class="input" required />
        <input v-model="email" type="email" placeholder="Email" class="input" required />
        <input v-model="password" type="password" placeholder="Password" class="input" required />

        <button type="submit" class="btn-green">Register</button>
      </form>

      <p class="mt-4 text-sm text-gray-600">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-500 hover:underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    await register(name.value, email.value, password.value)
    alert('Registered successfully!')
    router.push('/login')
  } catch (err: any) {
    alert(err.message)
  }
}
</script>

<style scoped>
.input {
  width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.5rem;
}
.btn-green {
  width: 100%; padding: 0.5rem; background: #10b981; color: white; border-radius: 0.5rem;
  transition: background 0.2s;
}
.btn-green:hover { background: #059669; }
</style>
