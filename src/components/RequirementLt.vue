<script setup>
import { computed, ref, reactive, onBeforeMount } from "vue";
import {
  mdiLifebuoy,
  mdiAccountSearch,
  mdiStarHalfFull,
  mdiPhone,
  mdiMicrophone,
  mdiPlusThick,
  mdiCheck,
  mdiLeadPencil,
} from "@mdi/js";
import ModalBox from "@/components/ModalBox.vue";
import CardComponent from "@/components/CardComponent.vue";
import CheckboxCell from "@/components/CheckboxCell.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { themeStore } from "../stores/theme";
import Icon from "@/components/Icon.vue";
import { careercStore } from "@/stores/careercraft";
import { useRoute } from "vue-router";
import { selectClasses } from "../selectcss";
import HeroBar from "@/components/HeroBar.vue";
import Multiselect from "@vueform/multiselect";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import dayjs from "dayjs";
import Reminder from "@/components/Reminder.vue";
import SpocDetails from "../views/SpocDetails.vue";
import AcademicDetail from "../views/AcademicDetail.vue";
import Skills from "../views/Skills.vue";
import ReminderHistory from "../views/ReminderHistory.vue";
import CallHistoryList from "../views/CallHistoryList.vue";
import { reqliststore } from "../stores/reqbd";
import { useRouter } from "vue-router";
import AssignDT from "../views/AssignDT.vue";
import AssignBdToDtModel from "@/views/AssignBdToDtModel.vue"
const route = useRoute();
const router = useRouter();
const theme = themeStore();
const career = careercStore();
const data = reqliststore();

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);
const lightBorderStyle = computed(() => theme.lightBorderStyle);

const lightBgStyle = computed(() => theme.lightBgStyle);

const tableTrStyle = computed(() => theme.tableTrStyle);

const tableTrOddStyle = computed(() => theme.tableTrOddStyle);

const darkMode = computed(() => theme.darkMode);

const props = defineProps({
  enqs: Array,
  checkable: Boolean,
  perPage: {
    type: Number,
    default: 25,
  },
});

// pagination
const perPage = 25;
const checkable = ref(false);
const checkedRows = ref([]);
const pageLoading = ref(false);
const maxPages = ref(10);
const numPages = computed(() => Math.ceil(itemsCount.value / perPage));
const itemsPaginated = computed(() => data.req_list);
const itemsCount = computed(() => data.req_count);
const currentPage = ref(0);
const currentPageHuman = computed(() => currentPage.value + 1);
const pageChange = async (page) => {
  pageLoading.value = true;
  currentPage.value = page;
  await data.getRequirement(page, searchString);
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
    (i) => startPage + i
  );
});

const showRecords = ref(false);
const crec = Array({
  id: null,
});

const hover = ref(false);
const date_selected1 = ref(dayjs(new Date()).format("YYYY-MM-01"));
const date_selected2 = ref(dayjs(new Date()).format("YYYY-MM-DD"));

let fromtoDate = "";
fromtoDate +=
  "&date=" + date_selected1.value + "&date1=" + date_selected2.value;

let copysearchString = "";

const modalOneActive = ref(false);
const newReminder = ref(false);
const companyname = ref(false);
const skill = ref(false);
const academicDetails = ref(false);
const search = ref({});
const params = ref("");
const searchbutton = ref("");
const assign_bd_to_dt = ref(false)

const maskNumber = (number) => {
  return number.replace(/\d(?=\d{4})/g, "*");
};

const number = (value) => {
  if (/^[0-9]{10}$/.test(value)) {
    return contactnumber.value;
  }
};

// search
let searchString = "";
const company_select = ref("");
const fetchreqname = ref("");
const org = ref("");
const graduation = ref("");
const spoc = ref("");
const status = ref("");
const searchParams = async () => {
  let valid = true;
  searchString = ""
  
  if (company_select.value) {
    searchString += "&company_details_id=" +
      company_select.value
  }
  if (org.value) {
    searchString += "&organisation_id=" +
      org.value
  }
  if (fetchreqname.value) {
    searchString +=  "&name=" +
      fetchreqname.value
  }
  if (graduation.value) {
    searchString += "&qualification_type_id=" +
      graduation.value
  }
  if (spoc.value) {
    searchString += "&business_spoc=" +
      spoc.value
  }
  if (status.value) {
    searchString += "&status_id=" +
      status.value
  }

  console.log("jhefbrkeghteohjetohjy",currentPage.value, searchString);
  await data.getRequirement(1, searchString);
  if (valid) {
    emit("search", searchString);
  } else {
    theme.pushMessage("Search form has errors!");
  }
};

const clearSearchParams = async () => {
  copysearchString = "";
  company_select.value = "";
  org.value = "";
  fetchreqname.value = "";
  graduation.value = "";
  spoc.value = "";
  status.value = "";
  emit("search", "");
  await data.getRequirement(1, "");
};

const close = () => {
  searchbutton.value = false;
  copysearchString = "";
  company_select.value = "";
  org.value = "";
  fetchreqname.value = "";
  graduation.value = "";
  spoc.value = "";
  status.value = "";
};

const fetchcompany = async (query) => {
  let company = await data.getCompany(query);
  return company;
};

const fetchreqName = async (query) => {
  let req = await data.getReqlist(query);
  return req;
};

const org_name = async (query) => {
  let orgselect = await data.getOrg(query);
  return orgselect;
};

const gra_name = async (query) => {
  let graselect = await data.getGraduationType(query);
  return graselect;
};

const spoc_name = async (query) => {
  let spocselect = await data.getSpoc(query);
  return spocselect;
};

const status_name = async (query) => {
  let statusselect = await data.getStatus(query);
  return statusselect;
};

const req_listdata = computed(() => {
  console.log("ASDFGHJKL:",data.$state.req_list);
  return data.$state.req_list;
});

const cl_listdata = computed(() => {
  return data.$state.nrecords;
});

const demo = Array({
  id: null,
});
const id = ref(null);

const send = (sid) => {
  id.value = sid;
  companyname.value = true;
};

const academic = (sid) => {
  id.value = sid;
  academicDetails.value = true;
};

const skillray = (sid) => {
  console.log("clickeddddd", sid);
  id.value = sid;
  skill.value = true;
};

const remind_fn = (sid) => {
  console.log("clickedddddidddd", sid);
  id.value = sid;
  newReminder.value = true;
};

// const oldReminder = ref(false);
// const remind_history = (sid) => {
//   console.log("clickedddddidddd", sid);
//   demo.id = sid;
//   oldReminder.value = true;
//   router.push("/rem-history/?rid");
// };

const callrecord = async (fid) => {
  console.log("callrecord req id...", fid);
  await data.getCallHistoryList(fid);
  crec.id = fid;
  showRecords.value = true;
};

// added student
const addedstd = async (sid) => {
  await data.mappedStd(sid);
  router.push(`/mppstudent-list/${sid}`);
};

const assigndt_lead = ref(false);
const tdate = ref("");
const online = ref("");
const offline = ref("");
const assign_dt = async (fid, date, url, link) => {
  tdate.value = date;
  id.value = fid;
  online.value = url;
  offline.value = link;
  assigndt_lead.value = true;
};

onBeforeMount(async () => {
  currentPage.value = 1;
  await data.getRequirement();
});

const assignBDtoDT = () => {
  assign_bd_to_dt.value = true

}




</script>

<template>
  <!-- pagination -->
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

  <!-- search -->
  <aside
    id="aside-right"
    class="dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 fixed top-0 right-0 z-40 h-screen w-60 overflow-y-scroll border-l border-gray-100 bg-white pr-1.5 transition-position dark:border-gray-700 dark:bg-gray-900 lg:top-14 lg:h-screen-menu"
    v-if="searchbutton"
  >
    <header
      class="flex items-stretch border-b border-gray-100 dark:border-gray-700"
    >
      <p class="flex grow items-center py-3 px-6 font-bold">Search Here</p>

      <a
        @click="close()"
        class="flex cursor-pointer items-center justify-center py-3 px-4"
        ><span class="inline-flex h-6 w-6 items-center justify-center"
          ><svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
            <path
              fill="currentColor"
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            ></path></svg></span
      ></a>
    </header>
    <div class="p-3">
      <div class="mb-4">
        <field label="Company Name">
          <Multiselect
            v-model="company_select"
            valueProp="id"
            label="company"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Select Company"
            track-by="name"
            :classes="selectClasses"
            @click="changing"
            :options="
              async function (query) {
                return await fetchcompany(query);
              }
            "
          />
        </field>
      </div>
      <div class="mb-7">
        <field label="Requirement Name">
          <Multiselect
            v-model="fetchreqname"
            valueProp="name"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Select Req name"
            :filter-results="false"
            :min-chars="1"
            :resolve-on-load="true"
            :delay="0"
            track-by="name"
            :classes="selectClasses"
            @click="changing"
            :options="
              async function (query) {
                return await fetchreqName(query);
              }
            "
          />
        </field>
      </div>

      <div class="mb-7">
        <field label="Organization">
          <Multiselect
            v-model="org"
            valueProp="id"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Select organization"
            :filter-results="false"
            :min-chars="1"
            :resolve-on-load="true"
            :delay="0"
            track-by="id"
            :classes="selectClasses"
            @click="changing"
            :options="
              async function (query) {
                return await org_name(query);
              }
            "
          />
        </field>
      </div>
      <div class="mb-7">
        <field label="Graduation Type">
          <Multiselect
            v-model="graduation"
            valueProp="id"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Select graduation type"
            :filter-results="false"
            :min-chars="1"
            :resolve-on-load="true"
            :delay="0"
            track-by="id"
            :classes="selectClasses"
            @click="changing"
            :options="
              async function (query) {
                return await gra_name(query);
              }
            "
          />
        </field>
      </div>
      <div class="mb-7">
        <field label="Spoc Name">
          <Multiselect
            v-model="spoc"
            valueProp="name"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Select spoc name"
            :filter-results="false"
            :min-chars="1"
            :resolve-on-load="true"
            :delay="0"
            track-by="name"
            :classes="selectClasses"
            @click="changing"
            :options="
              async function (query) {
                return await spoc_name(query);
              }
            "
          />
        </field>
      </div>
      <div class="mb-7">
        <field label="Status">
          <Multiselect
            v-model="status"
            valueProp="id"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Select status"
            :filter-results="false"
            :min-chars="1"
            :resolve-on-load="true"
            :delay="0"
            track-by="id"
            :classes="selectClasses"
            @click="changing"
            :options="
              async function (query) {
                return await status_name(query);
              }
            "
          />
        </field>
      </div>

      <div class="mb-2 grid grid-cols-1 last:mb-0">
        <div class="grid grid-cols-2 gap-3 md:grid-cols-2">
          <jb-buttons class="justify-center">
            <jb-button
              label="Search"
              type="submit"
              color="success"
              @click="searchParams()"
              class="mx-auto ml-0 block cursor-pointer whitespace-nowrap rounded border pt-1 pb-1 pr-5 pl-5 text-white transition-colors duration-150 focus:outline-none focus:ring"
            />
          </jb-buttons>
          <jb-buttons class="justify-center">
            <jb-button
              label="Clear"
              type="submit"
              color="danger"
              @click="clearSearchParams()"
              class="mx-auto ml-0 mr-0 block cursor-pointer whitespace-nowrap rounded border pt-1 pb-1 pr-5 pl-5 text-white transition-colors duration-150 focus:outline-none focus:ring"
            />
          </jb-buttons>
        </div>
      </div>
    </div>
    <!-- <div class="mb-2 grid grid-cols-2 pl-6 last:mb-0">
      <jb-buttons>
        <jb-button class="py-0 px-0 pt-1" label="Submit" color="success" />
      </jb-buttons>
      <jb-buttons>
        <jb-button class="py-0 px-0 pt-1" label="Clear" color="danger" />
      </jb-buttons>
    </div> -->
  </aside>
  <div class="grid grid-cols-2 last:mb-0">
    <hero-bar> Requirement List </hero-bar>
    <div class="bg-gray-900 pt-2">
      <div
        class="flex flex-wrap items-center justify-start"
        style="justify-content: end; margin-right: 10px"
      >
        <jb-buttons>
          <jb-button
            class="py-0 px-0 pt-0 pb-0"
            label="BD to DT"
            color="info"
            @click="assignBDtoDT"
          />
          <jb-button
            class="py-0 px-0 pt-0 pb-0"
            label="Search"
            color="info"
            @click="searchbutton = true"
          />
          
        </jb-buttons>
      </div>
    </div>
  </div>
  <CallHistoryList
    v-model="showRecords"
    large-title="Assign to dt"
    button="info"
    has-cancel
  />
  <!-- <reminder-history
    v-model="oldReminder"
    large-title="Reminder History"
    button="info"
    has-cancel
    :data="demo"
    :item="remider_history"
  /> -->
  <AssignDT
    v-model="assigndt_lead"
    large-title="Assign to dt"
    button="info"
    :data="id"
    :item="tdate"
    :all="req_listdata"
    :link="offline"
    :url="online"
    has-cancel
  />
  <table class="border-collapse border border-slate-500">
    <Reminder
      v-model="newReminder"
      large-title="Add Reminder"
      button="info"
      has-cancel
      :data="id"
    />
    <spoc-details
      v-model="companyname"
      large-title="Spoc Details"
      button="info"
      has-cancel
      :data="id"
      :item="req_listdata"
    />
    <skills
      v-model="skill"
      large-title="Skill Details"
      button="info"
      has-cancel
      :data="id"
      :item="req_listdata"
    />
    <academic-detail
      v-model="academicDetails"
      large-title="Academic Details"
      button="info"
      has-cancel
      :data="id"
      :item="req_listdata"
    />

    <AssignBdToDtModel v-model="assign_bd_to_dt" v-if="assign_bd_to_dt"  has-cancel/>

    <thead>
      <tr class="border text-orange-400">
        <th v-if="checkable" />
        <th>Requirement</th>
        <th>Company Name</th>
        <th>Total Students</th>
        <th>Status</th>
        <th>Organization</th>
        <th>Reminder List</th>
        <th>Record</th>
        <th>Requirement Details</th>
        <th>Academic Details</th>
        <!-- <th>Assign</th> -->
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-collapse border text-center"
        v-for="menu in req_listdata"
        :key="menu"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell v-if="checkable" @checked="checked($event, client)" />
        <td class="capitalize">{{ menu.name }}</td>
        <td
          class="cursor-pointer capitalize text-orange-400 underline"
          @click="send(menu.id)"
        >
          {{ menu.company_details_name }}
        </td>
        <!-- <div>
          <div @mouseover="hover = true">
            <td @mouseleave="hover = false">Capgemini</td>
          </div>
          <card-component v-show="hover" smallerPadding>
            <div class="flex">
              <div class="mr-2">
                <h1 class="text-blue-500">Spoc Details:</h1>
                <p>name</p>
                <p>email</p>
                <p>number</p>
                <p>status</p>
              </div>
              <div>
                <h1 class="text-blue-500">Interview Details:</h1>
                <p>date</p>
                <p>rounds</p>
              </div>
            </div>
          </card-component>
        </div> -->
        <td data-label="Added Status text-center">
          <span
            small
            @click="addedstd(menu.id)"
            class="cursor-pointer text-yellow-500 underline lg:p-1"
            >{{ menu.student_count }}</span
          >
          <span class="text-yellow-500">/</span>
          <span small class="text-yellow-500">{{ menu.position }}</span>
        </td>
        <td class="capitalize">{{ menu.status }}</td>
        <td>{{ menu.organisation.name }}</td>
        <td>
          <div>
            <jb-buttons class="flex items-center justify-center">
              <jb-button
                label="new"
                @click="remind_fn(menu.id)"
                color="info"
                small
              />
              <jb-button
                label="History"
                color="info"
                small
                :to="`/rem-history/${menu.id}`"
              />
            </jb-buttons>
          </div>
        </td>
        <td>
          <jb-buttons class="flex items-center justify-center">
            <jb-button
              :label="menu.callrecord_count"
              color="info"
              small
              :icon="mdiMicrophone"
              @click="callrecord(menu.id)"
            />
          </jb-buttons>
        </td>
        <td>
          <jb-buttons class="flex items-center justify-center">
            <jb-button
              label="View"
              color="info"
              small
              @click="skillray(menu.id)"
            />
          </jb-buttons>
        </td>
        <td>
          <jb-buttons class="flex items-center justify-center">
            <jb-button
              label="View"
              color="info"
              small
              @click="academic(menu.id)"
            />
          </jb-buttons>
        </td>
        <!-- <td>
          <jb-buttons class="flex items-center justify-center">
            <jb-button
              label="Assign"
              color="info"
              @click="
                assign_dt(
                  menu.id,
                  menu.tentative_date,
                  menu.meeting_url,
                  menu.google_link
                )
              "
              small
            />
          </jb-buttons>
        </td> -->
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
        :color="page === currentPage ? 'success' : 'warning'"
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

<style scoped>
tbody,
tr,
td {
  text-align: center;
}
thead,
tr,
th {
  text-align: center;
}
</style>
