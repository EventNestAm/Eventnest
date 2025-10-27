<script setup>
defineProps({
  align: {
    default: "center",
  },
});
</script>

<template>
  <div :class="['mt-4', align === 'center' && 'text-center']">
    <h1 class="sm:text-xl text-2xl md:text-3xl lg:tracking-tight pt-2 uppercase font-bold">
      <slot name="title">Title</slot>
    </h1>
  </div>
</template>
