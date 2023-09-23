<script setup>
import { ref } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
    validator: value => !!value.text
  }
})

const emit = defineEmits(['expired', 'cancel'])

const lifetimeMs = 3000
const active = ref(false)

setTimeout(() => {
  active.value = true
})

setTimeout(() => {
  active.value = false

  setTimeout(() => {
    emit('expired')
  }, lifetimeMs)
}, lifetimeMs)

const cancel = () => {
  emit('cancel', props.message)
  active.value = false
}
</script>

<template>
  <transition
    enter-active-class="animate-fadeInUp"
    leave-active-class="animate-fadeOut"
  >
    <div
      v-show="active"
      class="inline-flex items-center justify-between self-end my-3 shadow rounded bg-gray-800 text-white
        overflow-hidden w-full md:w-auto md:max-w-full min-h-12 pointer-events-auto dark:bg-gray-900"
    >
      <div class="p-4">
        {{ message.text }}
      </div>
      <div>
        <button
          class="px-3 py-2 text-center text-emerald-700 text-sm uppercase font-semibold"
          @click="cancel"
        >
          Ok
        </button>
      </div>
    </div>
  </transition>
</template>
