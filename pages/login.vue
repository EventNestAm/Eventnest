<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
	try {
		await login(email.value, password.value);
		router.push("/"); 
	} catch (err: any) {
		alert(err.message);
	}
};
</script>

<template>
	<div class="flex min-h-screen items-center justify-center bg-[#eaddff]">
		<div class="w-full max-w-md bg-white p-8 rounded-2xl shadow">
			<h2 class="text-2xl font-bold mb-6">Login</h2>

			<form @submit.prevent="handleLogin" class="space-y-4">
				<input v-model="email" type="email" placeholder="Email" class="input" required />
				<input
					v-model="password"
					type="password"
					placeholder="Password"
					class="input"
					required
				/>

				<button type="submit" class="btn-blue">Login</button>
			</form>

			<p class="mt-4 text-sm text-gray-600">
				Don't have an account?
				<NuxtLink to="/register" class="text-blue-500 hover:underline">Register</NuxtLink>
			</p>
		</div>
	</div>
</template>

<style scoped>
.input {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 0.5rem;
}
.btn-blue {
	width: 100%;
	padding: 0.5rem;
	background: #00308F;
	color: white;
	border-radius: 0.5rem;
	transition: background 0.2s;
}
.btn-blue:hover {
	background: #214ba5;
}
</style>
