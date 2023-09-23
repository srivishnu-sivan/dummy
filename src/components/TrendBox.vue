<script setup>
import { buttonMenuOptions } from '@/button-menu-sample-options.js'
import { mdiCog } from '@mdi/js'
import { computed } from 'vue'
//import { useStore } from 'vuex'
import TrendPill from '@/components/TrendPill.vue'
import Level from '@/components/Level.vue'
import ButtonMenu from '@/components/ButtonMenu.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

defineProps({
  trend: {
    type: String,
    default: null
  },
  trendType: {
    type: String,
    default: null
  }
})


const darkMode = computed(() => theme.darkMode)
</script>

<template>
  <level v-if="trend" class="mb-3" mobile>
    <trend-pill :trend="trend" :trend-type="trendType" small />
    <button-menu
      :options="buttonMenuOptions"
      :icon="mdiCog"
      icon-w="w-4"
      icon-h="h-4"
      :color="darkMode ? 'white' : 'light'"
      :outline="darkMode"
      small
    />
  </level>
</template>
