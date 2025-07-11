<script setup>
defineProps({
  align: {
    default: "center",
  },
});
</script>

<template>
  <div :class="['mt-4', align === 'center' && 'text-center']">
    <h1 class="text-3xl sm:text-4xl lg:tracking-tight pt-2 uppercase">
      <slot name="title">Title</slot>
    </h1>
    <!-- <p class="text-lg mt-4 text-slate-600">
      <slot name="desc">Some description goes here</slot>
    </p> -->
  </div>
</template>
