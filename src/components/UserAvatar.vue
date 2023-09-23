<script setup>
import { computed } from 'vue'
// import { mdiCamera } from '@mdi/js'
import FilePicker from '@/components/FilePicker.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const props = defineProps({
  username: {
    type: String,
    default: null
  },
  bg: {
    type: String,
    default: 'bg-gray-100 dark:bg-gray-800'
  },
  api: {
    type: String,
    default: 'api/avataaars'
  },
  button: Boolean
})


const avatar = computed(() => props.username
  ? `https://avatars.dicebear.com/${props.api}/${props.username.replace(/[^a-z0-9]+/i, '-')}.svg`
  : theme.userAvatar)

const name = computed(() => props.username ? props.username : theme.userName)
</script>

<template>
  <div :class="{ 'relative': button }">
    <img :src="avatar" :alt="name" class="rounded-full block h-auto w-full max-w-full" :class="bg" />
    <div v-if="button" class="absolute right-0 bottom-0">
      <file-picker :icon="mdiCamera" rounded-full />
    </div>
  </div>
</template>
