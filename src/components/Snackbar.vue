<script setup>
import { computed } from 'vue'
import SnackbarBar from '@/components/SnackbarBar.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

defineProps({
  active: Boolean
})

const messages = computed(() => theme.messages)

const expired = () => {
  theme.shiftMessage()
}
</script>

<template>
  <div class="fixed inset-0 flex flex-col-reverse p-9 overflow-hidden z-100 pointer-events-none">
    <snackbar-bar
      v-for="message in messages"
      :key="message.ts"
      :active="true"
      :message="message"
      @expired="expired"
    />
  </div>
</template>
