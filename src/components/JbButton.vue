<script setup>
import { computed } from 'vue'
import { getButtonColor } from '@/colors.js'
import Icon from '@/components/Icon.vue'
import Tip from '@/components/Tip.vue'
import Pill from '@/components/Pill.vue'

const props = defineProps({
  label: {
    type: [String, Number],
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  iconRight: {
    type: String,
    default: null
  },
  iconW: {
    type: String,
    default: null
  },
  iconH: {
    type: String,
    default: null
  },
  iconSize: {
    type: [String, Number],
    default: null
  },
  href: {
    type: String,
    default: null
  },
  target: {
    type: String,
    default: null
  },
  to: {
    type: [String, Object],
    default: null
  },
  type: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: 'white'
  },
  small: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean,
  activeSoft: Boolean,
  noFocusRing: Boolean,
  as: {
    type: String,
    default: null
  },
  tip: {
    type: String,
    default: null
  },
  tipX: {
    type: String,
    default: null
  },
  tipTop: Boolean,
  roundedFull: Boolean,
  addon: Boolean,
  pillText: {
    type: String,
    default: null
  },
  pillType: {
    type: String,
    default: 'info'
  }
})

const is = computed(() => {
  if (props.as) {
    return props.as
  }

  if (props.to) {
    return 'router-link'
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const computedType = computed(() => {
  if (is.value === 'button') {
    return props.type ?? 'button'
  }

  return null
})

const labelClass = computed(() => {
  return [
    props.small && props.icon ? 'pl-1' : 'pl-1',
    props.small && props.iconRight ? 'pr-1' : 'pr-1'
  ]
})

const componentClass = computed(() => {
  const base = [
    'inline-flex',
    'cursor-pointer',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'ring-blue-700',
    'focus:outline-none',
    'transition-colors',
    'duration-150',
    props.activeSoft ? 'border-2' : 'border',
    getButtonColor(props.color, props.outline, !props.disabled)
  ]

  if (props.disabled) {
    base.push('cursor-not-allowed', props.outline ? 'opacity-50' : 'opacity-70')
  }

  if (props.small) {
    base.push(
      // props.roundedFull ? 'px-1 py-1' : 'p-1'
    )
  } else {
    base.push(
      'py-2',
      props.roundedFull ? 'px-6' : 'px-3'
    )
  }

  if (props.tip) {
    base.push('relative')
  }

  if (!props.noFocusRing) {
    base.push('focus:ring')
  }

  if (props.active) {
    base.push('ring')
  }

  if (props.addon) {
    base.push(props.roundedFull ? 'first:rounded-l-full last:rounded-r-full' : 'first:rounded-l last:rounded-r')
  } else {
    base.push(props.roundedFull ? 'rounded-full' : 'rounded')
  }

  return base
})
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    :href="href"
    :type="computedType"
    :to="to"
    :target="target"
    :disabled="disabled"
  >
    <icon
      v-if="icon"
      :path="icon"
    />
    <span
      v-if="label"
      :class="labelClass"
    >{{ label }}</span>
    <pill
      v-if="pillText"
      :text="pillText"
      :type="pillType"
      small
    />
    <icon
      v-if="iconRight"
      :path="iconRight"
      :w="iconW"
      :h="iconH"
      :size="iconSize"
    />
    <tip
      :tip="tip"
      :left="tipX === 'left'"
      :right="tipX === 'right'"
      :top="tipTop"
    />
  </component>
</template>
