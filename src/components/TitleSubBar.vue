<script setup>
// import { buttonMenuOptions } from '@/button-menu-sample-options.js'
// import { mdiMenu } from '@mdi/js'
import { computed } from 'vue'
//import { useStore } from 'vuex'
import Icon from '@/components/Icon.vue'
// import ButtonMenu from '@/components/ButtonMenu.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

defineProps({
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  }
})

const darkMode = computed(() => theme.darkMode)
</script>

<template>
  <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <icon v-if="icon" :path="icon" class="mr-3" />
      <h1 class="text-2xl">{{ title }}</h1>
    </div>
    <!-- <button-menu :options="buttonMenuOptions" :icon="mdiMenu" :outline="darkMode" small /> -->
  </section>
</template>
