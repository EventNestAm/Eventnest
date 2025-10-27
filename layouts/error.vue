<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#e0ebff] text-center px-6">
    <!-- Animated background circles -->
    <div class="absolute inset-0 flex justify-center items-center -z-10">
      <div class="circle animate-pulse bg-[#00308f] opacity-20"></div>
      <div class="circle animate-ping bg-[#00308f] opacity-10"></div>
    </div>

    <!-- Error content -->
    <h1 class="text-6xl md:text-8xl font-extrabold text-[#00308f] mb-6">404</h1>
    <h2 class="text-2xl md:text-4xl font-semibold text-[#00308f]/90 mb-4">
      Oops! Page not found
    </h2>
    <p class="text-[#00308f]/70 mb-8 max-w-md">
      The page you are looking for does not exist, or has been moved. Don’t worry, you can go back to the homepage and continue exploring Eventnest.
    </p>

    <!-- Button -->
    <NuxtLink
      to="/"
      class="px-6 py-3 bg-[#00308f] text-white font-semibold rounded-xl hover:bg-[#002060] transition-all duration-300 shadow-lg"
    >
      Go to Homepage
    </NuxtLink>
  </div>
</template>

<style scoped>
.circle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  position: absolute;
}

.animate-pulse {
  animation: pulse 6s infinite ease-in-out;
}

.animate-ping {
  animation: ping 8s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

@keyframes ping {
  0% {
    transform: scale(0.8);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.05;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.1;
  }
}
</style>
