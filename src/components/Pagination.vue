<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const page = ref(1)
const totalPages = ref(13)
const displayedPages = ref(Array.from({ length: 10 }, (_, index) => index + 1))

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage
    store.commit('setCurrentPageOnReboot', newPage)
    store.dispatch('fetchFilmsList')
    router.push({ query: { page: newPage } })
  }
}

const handleRouteChange = () => {
  const currentPageFromUrl = parseInt(router.currentRoute.value.query.page) || 1 // Чтение текущей страницы из URL
  if (currentPageFromUrl >= 1 && currentPageFromUrl <= totalPages.value) {
    page.value = currentPageFromUrl
    store.commit('setCurrentPageOnReboot', currentPageFromUrl)
    store.dispatch('fetchFilmsList')
  }
}

watch(page, (newPage) => {
  if (newPage <= 5) {
    displayedPages.value = Array.from(
      { length: Math.min(totalPages.value, 10) },
      (_, index) => index + 1
    )
  } else if (newPage >= totalPages.value - 4) {
    displayedPages.value = Array.from(
      { length: Math.min(totalPages.value, 10) },
      (_, index) => totalPages.value - 9 + index
    )
  } else {
    displayedPages.value = Array.from({ length: 10 }, (_, index) => newPage - 5 + index)
  }
})

onMounted(() => {
  handleRouteChange()
})

router.afterEach(() => {
  handleRouteChange()
})
</script>

<template>
  <nav class="flex justify-center my-8 md:my-16">
    <button
      @click="changePage(page - 1)"
      :disabled="page === 1"
      class="bg-violet-100 px-2 md:px-3 py-1 mx-1 rounded-md hover:bg-violet-200"
      :class="{ 'cursor-not-allowed': page === 1 }"
    >
      <
    </button>

    <div v-for="pageNumber in displayedPages" :key="pageNumber">
      <button
        @click="changePage(pageNumber)"
        :class="{ 'bg-purple-200': page === pageNumber, 'bg-violet-100': page !== pageNumber }"
        class="px-2 md:px-3 py-1 md:mx-1 rounded-md hover:bg-violet-200"
      >
        {{ pageNumber }}
      </button>
    </div>

    <button
      @click="changePage(page + 1)"
      :disabled="page === totalPages"
      :class="{ 'cursor-not-allowed': page === totalPages }"
      class="bg-violet-100 px-2 md:px-3 py-1 mx-1 rounded-md hover:bg-violet-200"
    >
      >
    </button>
  </nav>
</template>
