<script setup>
import { computed } from 'vue'
//import { useStore } from 'vuex'
import Level from '@/components/Level.vue'
import JbLogo from '@/components/JbLogo.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const year = computed(() => new Date().getFullYear())

const isFooterBarVisible = computed(() => !theme.isFormScreen)
</script> 

<template>
  <footer v-show="isFooterBarVisible" class="bg-white py-2 px-6 dark:bg-gray-900/70">
    <level>
      <div>&copy; {{ year }}, JustBoil.me</div>
      <div class="md:py-2">
        <a href="https://justboil.me">
          <jb-logo class="w-auto h-8 md:h-6" />
        </a>
      </div>
    </level>
  </footer>
</template>
