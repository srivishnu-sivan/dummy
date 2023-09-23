<script setup>
import { colorsBg, colorsBorders } from '@/colors.js'
import { computed, ref } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: null
  },
  tr: {
    type: String,
    default: null
  }
})

const hasPing = ref(true)

setTimeout(() => {
  hasPing.value = false
}, 3000)

const componentClass = computed(() => {
  const base = [
    props.tr ?? 'top-0 right-0',
    colorsBg[props.color],
    colorsBorders[props.color]
  ]

  if (hasPing.value) {
    base.push('animate-ping')
  }

  return base
})
</script>

<template>
  <div
    v-if="color"
    class="w-2.5 h-2.5 rounded-full absolute"
    :class="componentClass"
  />
</template>
