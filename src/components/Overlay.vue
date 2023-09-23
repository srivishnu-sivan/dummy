<script setup>
import { computed } from "vue";
import { themeStore } from "../stores/theme";
const theme = themeStore();

defineProps({
  zIndex: {
    type: String,
    default: "z-50",
  },
});

const emit = defineEmits(["overlay-click"]);

const overlayClick = event => {
  emit("overlay-click", event);
};

const overlayStyle = computed(() => theme.overlayStyle);
</script>

<template>
  <div
    class="flex-col-1 fixed inset-0 flex h-[100%] items-center justify-center overflow-hidden"
    :class="zIndex"
    id="hello"
  >
    <transition
      enter-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"
        :class="[overlayStyle]"
        @click="overlayClick"
      />
    </transition>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="animate-fadeOut"
    >
      <slot />
    </transition>
  </div>
</template>
<style>
/* #hello{
  overflow-y: hidden;
  overflow-x: hidden;
} */
</style>