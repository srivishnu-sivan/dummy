<script setup>
import { computed } from 'vue'
import UpdateMark from '@/components/UpdateMark.vue'
import { colorsBg } from '@/colors.js'

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  w: {
    type: String,
    default: 'w-6'
  },
  h: {
    type: String,
    default: 'h-6'
  },
  size: {
    type: [String, Number],
    default: 16
  },
  updateMark: {
    type: String,
    default: null
  },
  updateMarkTr: {
    type: String,
    default: null
  }
})

const spanClass = computed(() => {
  const base = [
    'inline-flex',
    'justify-center',
    'items-center',
    props.w,
    props.h,
    colorsBg[props.color]
  ]

  if (props.updateMark) {
    base.push('relative')
  }

  return base
})

const svgSize = computed(() => {
  return props.size ?? 16
})
</script>

<template>
  <span :class="spanClass">
    <svg
      viewBox="0 0 24 24"
      :width="svgSize"
      :height="svgSize"
      class="inline-block"
    >
      <path
        fill="currentColor"
        :d="path"
      />
    </svg>
    <update-mark
      :color="updateMark"
      :tr="updateMarkTr"
    />
  </span>
</template>
