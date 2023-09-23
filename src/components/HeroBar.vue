<script setup>
import { mdiThemeLightDark } from '@mdi/js'
//import { useStore } from 'vuex'
import { computed } from 'vue'
import Level from '@/components/Level.vue'
import JbButton from '@/components/JbButton.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();


const lightBorderStyle = computed(() => theme.lightBorderStyle)

const darkMode = computed(() => theme.darkMode)

</script>

<template>
  <section
    :class="lightBorderStyle"
    class="bg-white border-t border-b p-2 dark:bg-gray-900/70 dark:border-gray-900 dark:text-white"
  >
    <level>
      <h1 class="text-xl font-semibold leading-tight text-orange-400">
        <slot />
      </h1>
    </level>
  </section>
</template>
