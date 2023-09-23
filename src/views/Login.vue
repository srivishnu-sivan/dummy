<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { mdiAccount, mdiEye, mdiEyeOff } from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import TextLink from '@/components/TextLink.vue'
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import { themeStore } from "../stores/theme";

const router = useRouter();
const user = sessionStore();
const theme = themeStore();

const form = reactive({
  username: '',
  password: '',
})

const usernameError = ref(false)
const passwordError = ref(false)
const hasError = ref(false)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')

const submit = async () => {
  if(form.username === "")
  {
    usernameError.value = true
    theme.pushMessage("Enter Valid Username");
  }
  if(form.username !== "" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.username)){
    usernameError.value = "Enter a Valid Username"
    theme.pushMessage("Enter Valid Username");
  }
  else if(form.password === ""){
    passwordError.value = true
    theme.pushMessage("Password is mandatory");
  }
  else{
    usernameError.value =false
    let msg = await user.login({ username: form.username, password: form.password });
    console.log(msg);
    if (user.loggedIn) {
      router.push("/req-list/");
      theme.pushMessage("Login Successful");
    }
  }
  
}

const passShowHideClicked = ref(false)

onBeforeMount(() => {
  if (user.loggedIn) {
    router.push("/");
  }
});
</script>

<template>
  <form-screen-section v-slot="{ cardClass, cardRounded }" bg="login" promo>
    <card-component
      :class="[cardClass, cardClassAddon]"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <field label="Username" :error="usernameError" help="Please enter your username">
        <control
          v-model="form.username"
          :icon-right="mdiAccount"
          name="login"
          placeholder="user@example.com"
          autocomplete="username"
        />
      </field>

      <field label="Password" :error="passwordError" help="Please enter your password">
        <control
          v-model="form.password"
          :error="passwordError"
          :tip-right="form.password ? 'Click to show/hide' : null"
          :icon-right="passShowHideClicked ? mdiEye : mdiEyeOff"
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="current-password"
          @right-icon-click="passShowHideClicked = !passShowHideClicked"
        />
      </field>

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Login"
              type="submit"
              color="info"
            />
     
          </jb-buttons>
        </level>
      </template>
    </card-component>
  </form-screen-section>
</template>
