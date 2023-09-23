<script setup>
import { computed, reactive, ref, onMounted, onBeforeMount } from "vue";
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from "@mdi/js";
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
import CardComponent from "@/components/CardComponent.vue";
import CheckboxCell from "@/components/CheckboxCell.vue";
import Level from "@/components/Level.vue";
import TextLink from "@/components/TextLink.vue";
import Overlay from "@/components/Overlay.vue";
import Field from "@/components/Field.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import { careercStore } from "../stores/careercraft";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme";
const counselor = careercStore();
const theme = themeStore();

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  id: {
    type: [Number, String],
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Add",
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
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};
const checkable = ref(false);

const cancel = () => confirmCancel("cancel");

const lightBorderStyle = computed(() => theme.lightBorderStyle);

const lightBgStyle = computed(() => theme.lightBgStyle);

const tableTrStyle = computed(() => theme.tableTrStyle);

const tableTrOddStyle = computed(() => theme.tableTrOddStyle);

const darkMode = computed(() => theme.darkMode);

const records = computed(() => {
  return counselor.nrecords;
});

console.log("records", records.value);

const recordCount = computed(() => {
  return counselor.nrecordCount;
});

const perPage = ref(25);

const currentPage = ref(0);

const checkedRows = ref([]);

const numPages = computed(() => Math.ceil(recordCount.value / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

onMounted(async () => {
  await counselor.getNRecordValues(props.id);
  console.log("beforemount",props.id);
});
</script>

<template>
  <overlay v-show="value" @overlay-click="cancel">
    <card-component
      v-show="value"
      :title="title"
      class="z-50 max-h-modal w-full shadow-lg md:w-4/5"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="space-y-3 pl-4">
        <table>
          <thead>
            <tr>
              <th v-if="checkable" />
              <th>Record</th>
              <th>Main Status</th>
              <th>Sub Status</th>
              <th>Duration</th>
              <th>DateTime</th>
            </tr>
          </thead>
        
          <tbody>
            <tr
              v-for="(client, index) in records"
              :key="client.id"
              :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
            >
              <checkbox-cell
                v-if="checkable"
                @checked="checked($event, client)"
              />
              <td data-label="Record">
                <small class="font-semibold text-gray-500 dark:text-gray-300">
                  <audio controls>
                    <source :src="client.audio" type="audio/ogg" />
                    Your browser does not support the audio tag.
                  </audio>
                </small>
              </td>
              <td data-label="Status">
                <small
                  v-for="(b, i) in client.status"
                  :key="i"
                  class="font-semibold text-gray-500 dark:text-gray-300"
                >
                  {{ b.main_status_name }} &nbsp;
                </small>
              </td>
                 <td data-label="Status">
                <small
                  v-for="(b, i) in client.status"
                  :key="i"
                  class="font-semibold text-gray-500 dark:text-gray-300"
                >
                  {{ b.sub_status_name }} &nbsp;
                </small>
              </td>
              <td data-label="Duration">
                <small>
                  {{client.duration}}
                </small>
              </td>
              
              <td data-label="DateTime">
                <small class="font-semibold text-gray-500 dark:text-gray-300">
                  {{ client.time }}
                </small>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          :class="lightBorderStyle"
          class="border-t p-3 dark:border-gray-800 lg:px-6"
        >
          <level mobile>
            <jb-buttons glue>
              <jb-button
                v-for="page in pagesList"
                :key="page"
                :active-soft="page === currentPage"
                :label="page + 1"
                addon
                :outline="darkMode"
                small
                no-focus-ring
                @click="currentPage = page"
              />
            </jb-buttons>
            <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
          </level>
        </div>
      </div>
    </card-component>
  </overlay>
</template>
