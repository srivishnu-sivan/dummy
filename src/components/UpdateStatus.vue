<script setup>
import { computed, ref, reactive, onBeforeMount } from "vue";
import { mdiPlusBox, mdiMicrophone, mdiAccountPlus } from "@mdi/js";
import ModalBox from "@/components/ModalBox.vue";
import ModalNumberRecord from "@/components/ModalNumberRecord.vue";
import ModalChangeStatus from "@/components/ModalChangeStatus.vue";
import CheckboxCell from "@/components/CheckboxCell.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { themeStore } from "../stores/theme";
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";
import { careercStore } from "../stores/careercraft";

const theme = themeStore();
const router = useRouter();
const counselor = careercStore();

const props = defineProps({
  enqs: Array,
  checkable: Boolean,
  perPage: {
    type: Number,
    default: 25,
  },
});

const lightBorderStyle = computed(() => theme.lightBorderStyle);

const lightBgStyle = computed(() => theme.lightBgStyle);

const tableTrStyle = computed(() => theme.tableTrStyle);

const tableTrOddStyle = computed(() => theme.tableTrOddStyle);

const darkMode = computed(() => theme.darkMode);

const perPage = 25;
const checkable = ref(false);
const pageLoading = ref(false);
const itemsPaginated = computed(() => counselor.updateStatus);
const itemsCount = computed(() => counselor.updateStatusCount);

// const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const currentPage = ref(0);

const checkedRows = ref([]);

const propValues = reactive({
  id: 0,
  name: "",
  enquiry: false,
  highest_degree: {},
  courses: [],
});

const isModalRecordActive = ref(false);

const openRecordModal = (number, name) => {
  isModalRecordActive.value = true;
  var digits = (""+number).split("");
  digits.shift()
  var number = digits.join("")
  propValues.id = number;
  propValues.name = name;
};

const isModalStatusActive = ref(false);

const openStatusModal = (id, name, enquiry) => {
  isModalStatusActive.value = true;
  propValues.id = id;
  propValues.name = name;
  propValues.enquiry = enquiry;
};

// const confirmRefresh = async () => {
//   pageLoading.value = true
//   await counselor.getUpdateStatus();
//   pageLoading.value = false
// };

// const addEnquiry = (id) => {
//   counselor.submitAddStatus({
//     status: {
//       rid: id,
//       main_status: 1,
//       sub_status: 1,
//       comment: "",
//     },
//   });
//   router.push({ path: "/add-enquiry", query: { rid: id } });
// };

const maskNumber = number => {
  return number.replace(/\d(?=\d{4})/g, "*");
};
const maxPages = ref(10);
const numPages = computed(() => Math.ceil(itemsCount.value / perPage));

const currentPageHuman = computed(() => currentPage.value + 1);

const pageChange = async page => {
  pageLoading.value = true;
  currentPage.value = page;
  await counselor.getUpdateStatus(page);
  pageLoading.value = false;
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const pagesList = computed(() => {
  const pagesList = [];
  let startPage;
  let endPage;
  if (currentPage.value < 1) {
    currentPage.value = 1;
  } else if (currentPage.value > numPages.value) {
    currentPage.value = numPages.value;
  }

  if (numPages.value <= maxPages.value) {
    startPage = 1;
    endPage = numPages.value;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(maxPages.value / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages.value / 2) - 1;
    if (currentPage.value <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages.value;
    } else if (currentPage.value + maxPagesAfterCurrentPage >= numPages.value) {
      // current page near the end
      startPage = numPages.value - maxPages.value + 1;
      endPage = numPages.value;
    } else {
      // current page somewhere in the middle
      startPage = currentPage.value - maxPagesBeforeCurrentPage;
      endPage = currentPage.value + maxPagesAfterCurrentPage;
    }
  }

  return Array.from(Array(endPage + 1 - startPage).keys()).map(
    i => startPage + i
  );
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};
</script>

<template>
  <!-- <modal-box v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box> -->

  <modal-change-status
    v-if="isModalStatusActive"
    v-model="isModalStatusActive"
    :title="'Update status of ' + propValues.name"
    :id="propValues.id"
    has-cancel
  >
  </modal-change-status>

  <modal-number-record
    v-if="isModalRecordActive"
    v-model="isModalRecordActive"
    :title="'Call record details of ' + propValues.name"
    :id="propValues.id"
    has-cancel
  >
  </modal-number-record>
  <!-- <modal-add-status v-if="isModalStatusActive" v-model="isModalStatusActive"
    :title="'Update status of ' + propValues.name" :id="propValues.id" :enquiry="propValues.enquiry"
    @confirm="confirmRefresh" has-cancel>
  </modal-add-status> -->
  <div
    v-if="checkedRows.length"
    class="bg-opacity-50 p-3 dark:bg-gray-800"
    :class="lightBgStyle"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="mr-2 inline-block rounded-sm px-2 py-1 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >
      {{ checkedRow.name }}
    </span>
  </div>
  <div
    v-if="pageLoading"
    wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700 opacity-75"
  >
    <div
      class="loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"
    ></div>
    <h2 class="text-center text-xl font-semibold text-white">Loading...</h2>
    <p class="w-1/3 text-center text-white">
      This may take a few seconds, please wait.
    </p>
  </div>
  <table>
    <thead>
      <tr class="text-orange-400">
        <th v-if="checkable" />
        <th>Contact</th>
        <th>Audio</th>
        <th>Record</th>
        <th>Status</th>
        <th>Call Duration</th>
        <th>DateTime</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(client, index) in itemsPaginated"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell v-if="checkable" @checked="checked($event, client)" />
        <td data-label="Contact">
          <small class="font-semibold text-gray-500 dark:text-gray-300">
            {{ maskNumber(client.number) }}
          </small>
        </td>
        <td data-label="Audio">
          <small class="font-semibold text-gray-500 dark:text-gray-300">
            <audio class="h-8 w-64" controls>
              <source :src="client.audio" type="audio/ogg" />
              <source :src="client.audio" type="audio/mp3 " />
              Your browser does not support the audio tag.
            </audio>
          </small>
        </td>
        <td data-label="Record">
          <jb-button
            :label="client.record_count"
            color="info"
            :icon="mdiMicrophone"
            small
            @click="openRecordModal(client.number, client.number)"
          />
        </td>
        <td data-label="Status">
          <jb-buttons>
            <!-- <span v-if="client.status.length == 0" > -->
            <jb-button
              @click="
                openStatusModal(client.id, client.number, client.enq_present)
              "
              label="Status"
              class="h-6 w-6 rounded-md bg-teal-500 px-8 text-sm text-black hover:border-slate-800 hover:bg-teal-300"
            />
            <!-- </span> -->
            <!-- <span v-else>
            <jb-button label="Updated" class="h-6 w-10 px-8 rounded-md text-sm text-yellow-50 bg-slate-800 border-y-amber-50 border-x-amber-100 hover:border-y-amber-200 hover:bg-slate-800"/>
            </span> -->
          </jb-buttons>
        </td>
        <td data-label="Call Duration">
          <small class="font-semibold text-gray-500 dark:text-gray-300">
            {{ client.duration }}
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
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active-soft="page === currentPage"
          :label="page"
          addon
          :outline="darkMode"
          small
          no-focus-ring
          @click="pageChange(page)"
        />
      </jb-buttons>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>

