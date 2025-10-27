<script setup lang="ts">
import { ref } from "vue";
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
	<div
		class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0ebff] to-[#eaddff] overflow-hidden px-4 md:px-0"
	>
		<div
			class="absolute w-48 h-48 md:w-72 md:h-72 bg-[#00308F]/20 rounded-full -top-16 -left-16 animate-float-slow"
		></div>
		<div
			class="absolute w-36 h-36 md:w-64 md:h-64 bg-[#00308F]/30 rounded-full -bottom-20 -right-12 animate-float"
		></div>
		<div
			class="absolute w-24 h-24 md:w-40 md:h-40 bg-[#00308F]/15 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
		></div>

		<div
			class="relative z-10 w-full max-w-md md:max-w-lg bg-white p-8 md:p-10 rounded-3xl shadow-xl"
		>
			<h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-[#00308F] text-center">
				Մուտք գործեք Eventnest
			</h2>

			<form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
				<input v-model="email" type="email" placeholder="Էլ․ փոստ" class="input" required />
				<input
					v-model="password"
					type="password"
					placeholder="Գաղտնաբառ"
					class="input"
					required
				/>

				<button type="submit" class="btn-blue w-full">Մուտք գործել</button>
			</form>

			<p class="mt-6 text-center text-gray-600 text-sm md:text-base">
				Հաշիվ չունե՞ք։
				<NuxtLink to="/register" class="text-[#00308F] font-semibold hover:underline"
					>Գրանցվել</NuxtLink
				>
			</p>
		</div>
	</div>
</template>

<style scoped>
.input {
	width: 100%;
	padding: 0.75rem 1rem;
	border: 1px solid #ccc;
	border-radius: 0.75rem;
	outline: none;
	font-size: 0.9rem;
	transition: all 0.2s;
}
.input:focus {
	border-color: #00308f;
	box-shadow: 0 0 10px rgba(0, 48, 143, 0.3);
}

.btn-blue {
	width: 100%;
	padding: 0.75rem;
	background: linear-gradient(90deg, #00308f, #214ba5);
	color: white;
	font-weight: 600;
	border-radius: 0.75rem;
	transition: all 0.3s;
	box-shadow: 0 4px 15px rgba(0, 48, 143, 0.4);
	font-size: 0.95rem;
}
.btn-blue:hover {
	background: linear-gradient(90deg, #214ba5, #00308f);
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(0, 48, 143, 0.5);
}

/* Floating animations */
@keyframes float {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-15px);
	}
}
@keyframes float-slow {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}
@keyframes spin-slow {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.animate-float {
	animation: float 6s ease-in-out infinite;
}
.animate-float-slow {
	animation: float-slow 8s ease-in-out infinite;
}
.animate-spin-slow {
	animation: spin-slow 25s linear infinite;
}

/* Media Queries */
@media (max-width: 640px) {
	.input {
		padding: 0.65rem 0.9rem;
		font-size: 0.85rem;
	}
	.btn-blue {
		font-size: 0.9rem;
		padding: 0.65rem;
	}
}
</style>
