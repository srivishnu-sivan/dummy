<script setup>
import { computed } from 'vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const props = defineProps({
  navBar: Boolean
})



const lightBorderStyle = computed(() => theme.lightBorderStyle)
</script>

<template>
  <hr
    :class="[lightBorderStyle, props.navBar ? 'hidden lg:block lg:my-0.5 dark:border-gray-700' : 'my-6 -mx-6 dark:border-gray-800']"
    class="border-t-2"
  />
</template>
