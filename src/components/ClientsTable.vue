<script setup>
import { computed, ref } from 'vue'
//import { useStore } from 'vuex'
import { mdiEye, mdiTrashCan, mdiLifebuoy } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const props = defineProps({
  checkable: Boolean,
  perPage: {
    type: Number,
    default: 10
  }
})


const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const items = computed(() => theme.clients)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value.slice(props.perPage * currentPage.value, props.perPage * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / props.perPage))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
  }
}
</script>

<template>
  <modal-box
    v-model="isModalActive"
    title="Sample modal"
    text-link-label="Need Help?"
    :text-link-icon="mdiLifebuoy"
  >
    <p>
      Lorem ipsum dolor sit amet
      <b>adipiscing elit</b>
    </p>
    <p>This is sample modal</p>
  </modal-box>

  <modal-box v-model="isModalDangerActive" large-title="Please confirm" button="danger" has-cancel>
    <p>
      Lorem ipsum dolor sit amet
      <b>adipiscing elit</b>
    </p>
    <p>This is sample modal</p>
  </modal-box>

  <div v-if="checkedRows.length" class="bg-opacity-50 p-3 dark:bg-gray-800" :class="lightBgStyle">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >{{ checkedRow.name }}</span>
  </div>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Company</th>
        <th>City</th>
        <th>Progress</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(client, index) in itemsPaginated"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <td class="image-cell">
          <user-avatar :username="client.name" class="image" />
        </td>
        <td data-label="Name">{{ client.name }}</td>
        <td data-label="Company">{{ client.company }}</td>
        <td data-label="City">{{ client.city }}</td>
        <td data-label="Progress" class="progress-cell">
          <progress max="100" :value="client.progress">{{ client.progress }}</progress>
        </td>
        <td data-label="Created">
          <small
            class="text-gray-500 dark:text-gray-400"
            :title="client.created"
          >{{ client.created }}</small>
        </td>
        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button color="info" :icon="mdiEye" small @click="isModalActive = true" />
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div :class="lightBorderStyle" class="p-3 lg:px-6 border-t dark:border-gray-800">
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
</template>
