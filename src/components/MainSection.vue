<script setup>
import { computed } from 'vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const isFormScreen = computed(() => theme.isFormScreen)
</script>

<template>
  <section :class="{ 'py-6': !isFormScreen }" class="px-0 md:px-6">
    <slot />
  </section>
</template>
