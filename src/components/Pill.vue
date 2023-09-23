<script setup>
import { computed } from 'vue'
import { colorsBg, colorsBorders, colorsOutline } from '@/colors.js'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  small: Boolean,
  outline: Boolean,
  wrapped: Boolean
})

const componentClass = computed(() => {
  const baseColor = props.outline ? colorsOutline[props.type] : [colorsBg[props.type], colorsBorders[props.type]]

  const base = [
    'border',
    props.small ? 'py-0.5 px-2 text-xs rounded-lg' : 'py-2 px-4 rounded-2xl',
    ...baseColor
  ]

  if (!props.wrapped) {
    base.push(props.small ? 'mr-1.5' : 'mr-3', 'last:mr-0')
  }

  return base
})
</script>

<template>
  <div
    class="inline-flex items-center capitalize"
    :class="componentClass"
  >
    <icon
      v-if="icon"
      :path="icon"
      h="h-4"
      w="w-4"
      class="mr-2"
    />
    <span>{{ text }}</span>
  </div>
</template>
