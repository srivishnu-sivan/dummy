<script setup>
//import { useStore } from 'vuex'
import { computed } from 'vue'
import { buttonMenuOptions } from '@/button-menu-sample-options.js'
import { mdiDotsVertical } from '@mdi/js'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import Pill from '@/components/Pill.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import ButtonMenu from '@/components/ButtonMenu.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

defineProps({
  product: {
    type: Object,
    required: true,
    validate: value => (value.name && value.date && value.adjective && value.material && value.price)
  }
})

const darkMode = computed(() => theme.darkMode)
</script>

<template>
  <card-component class="mb-6 last:mb-0" hoverable>
    <level>
      <level type="justify-start">
        <user-avatar class="w-12 h-12 md:mr-6" api="api/bottts" bg :username="product.name" />
        <div class="text-center md:text-left">
          <h4 class="text-xl">{{ product.name }}</h4>
          <p class="text-gray-500">{{ product.date }}</p>
        </div>
      </level>

      <level type="justify-end">
        <div class="md:mr-6">
          <pill type="success" :text="product.adjective" small />
          <pill type="info" :text="product.material" small />
          <pill type="warning" :text="product.product" small />
        </div>
        <h4 class="text-xl md:mr-6">${{ product.price }}</h4>
        <button-menu
          :options="buttonMenuOptions"
          :icon="mdiDotsVertical"
          :outline="darkMode"
          small
        />
      </level>
    </level>
  </card-component>
</template>
