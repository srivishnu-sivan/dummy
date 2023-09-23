<script setup>
import { computed, ref, watch } from 'vue'
//import { useStore } from 'vuex'
import { mdiCheckDecagram } from '@mdi/js'
import Level from '@/components/Level.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Pill from '@/components/Pill.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const userName = computed(() => theme.userName)

const userSwitchVal = ref([])

watch(userSwitchVal, value => {
  store.dispatch('pushMessage', value && value.indexOf('one') > -1 ? 'Success! Now active' : 'Done! Now inactive')
})
</script>

<template>
  <card-component class="items-center" flex-row>
    <level type="justify-around lg:justify-center">
      <user-avatar class="lg:mx-12" button />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
          <check-radio-picker
            v-model="userSwitchVal"
            name="sample-switch"
            type="switch"
            :options="{ one: 'Notifications' }"
          />
        </div>
        <h1 class="text-2xl">
          Howdy,
          <b>{{ userName }}</b>!
        </h1>
        <p>
          Last login
          <b>12 mins ago</b> from
          <b>127.0.0.1</b>
        </p>
        <div class="flex justify-center md:block">
          <pill text="Verified" type="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </level>
  </card-component>
</template>
