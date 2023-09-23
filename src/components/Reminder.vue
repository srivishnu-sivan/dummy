<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { mdiClose } from "@mdi/js";
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
import CardComponent from "@/components/CardComponent.vue";
import Level from "@/components/Level.vue";
import TextLink from "@/components/TextLink.vue";
import Overlay from "@/components/Overlay.vue";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import { reqliststore } from "../stores/reqbd";
import { themeStore } from "../stores/theme";
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const router = useRouter();
const user = sessionStore();
const data = reqliststore();
const theme = themeStore();

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  largeTitle: {
    type: String,
    default: null,
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Save",
  },
  shake: Boolean,
  hasCancel: Boolean,
  textLinkLabel: {
    type: String,
    default: null,
  },
  textLinkIcon: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  data: {
    type: Number,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmLogout = async () => {
  await user.logout();
  value.value = false;
  router.push("/login");
};

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
  (form.title = ""),
    (form.comment = ""),
    (form.client_number = ""),
    (form.reminder = "");
};

// const confirm = () => confirmLogout('confirm')

const cancel = () => confirmCancel("cancel");

const todayDate = () => {
  return dayjs(new Date()).format("YYYY-MM-DD");
};

const reminder_data = computed(() => {
  return data.$state.reminder;
});

// title validation
const hasError1 = ref(false);
const nanfunc1 = () => {
  if (form.title) {
    if (!/^[ A-Za-z/]*$/.test(form.title)) {
      hasError1.value = "only enter text";
    } else {
      hasError1.value = false;
    }
  }
};

// phone number validation
const hasError2 = ref(false);
const nanfunc3 = () => {
  if (form.client_number) {
    if (!/^[0-9]{10}$/.test(form.client_number)) {
      hasError2.value = "enter a valid number";
    } else {
      hasError2.value = false;
    }
  }
};

// date validation
const hasError3 = ref(false);
const nanfunc4 = () => {
  if (form.reminder) {
    if (form.reminder == "") {
      hasError3.value = "enter a valid date";
    } else {
      hasError3.value = false;
    }
  }
};

const form = reactive({
  id: props.data,
  title: "",
  comment: "",
  client_number: "",
  reminder: "",
});

const hasError = ref(false);

const submit = async () => {
  try {
    if (form.title == "") {
      theme.pushMessage("Fill Title and Date Field");
    } else if (form.reminder == "") {
      theme.pushMessage("Fill Date Field");
      hasError3.value = "enter a valid date";
    } else if (hasError2.value !== false) {
      theme.pushMessage("has error");
    } else {
      await data.getReminder({
        id: props.data,
        title: form.title,
        comment: form.comment,
        client_number: form.client_number.toString(),
        reminder: form.reminder,
      });
      theme.pushMessage("Successfully Enrolled");
      value.value = false;
      (form.title = ""),
        (form.comment = ""),
        (form.client_number = ""),
        (form.reminder = "");
    }
  } catch (err) {
    console.log("error", err);
  }
};
</script>

<template>
  <overlay v-show="value" @overlay-click="cancel">
    <card-component
      v-show="value"
      :title="title"
      class="z-50 max-h-modal w-full shadow-lg md:w-3/5 lg:w-2/5"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
      @submit.prevent="submit"
    >
      <div class="space-y-3">
        <h1 v-if="largeTitle" class="text-2xl">
          {{ largeTitle }}
        </h1>
      </div>

      <field label="Title">
        <control
          v-model="form.title"
          :icon-right="mdiAccount"
          placeholder="Title"
          :error="hasError1"
          :onchange="nanfunc1(form.title)"
        />
      </field>
      <field label="Description">
        <control
          v-model="form.comment"
          :icon-right="mdiAccount"
          placeholder="Description"
        />
      </field>

      <field label="Client Number">
        <control
          v-model="form.client_number"
          :icon-right="mdiAccount"
          type="number"
          placeholder="client number"
          :error="hasError2"
          :onchange="nanfunc3(form.client_number)"
        />
      </field>
      <field label="Date">
        <control
          v-model="form.reminder"
          type="date"
          :minDate="todayDate()"
          :error="hasError3"
          placeholder="select date"
          :onchange="nanfunc4(form.reminder)"
        />
      </field>
      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button label="Submit" @click="submit()" color="info" />
            <jb-button label="Cancel" color="info" @click="cancel" />
          </jb-buttons>
          <text-link :label="textLinkLabel" :icon="textLinkIcon" />
        </level>
      </template>
    </card-component>
  </overlay>
</template>
