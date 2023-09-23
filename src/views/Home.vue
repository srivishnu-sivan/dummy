<script setup>
import { onBeforeMount, computed, onMounted, ref } from "vue";
import CallRecordList from "@/components/CallRecordList.vue";
import HeroBar from "@/components/HeroBar.vue";
import CardComponent from "@/components/CardComponent.vue";
import { careercStore } from "../stores/careercraft";
import { themeStore } from "../stores/theme";
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";

const router = useRouter();

const user = sessionStore();

const theme = themeStore();
const counselor = careercStore();
const pageLoading = ref(false)

onMounted(async () => {
  if (!user.loggedIn) {
    router.push("login");
  }
});

onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkUser();
  if (user.loggedIn) {
    theme.setPageTitle("Update Status list");
  }
  pageLoading.value = false
});

</script>


<template>
  <card-component class="mb-6" has-table>
    <call-record-list />
  </card-component>
</template>
