<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import CardList from '@/components/CardList.vue'
import Search from '@/components/Search.vue'
import Pagination from '@/components/Pagination.vue'

const store = useStore()
const isLoading = ref(true)
const isSearching = ref(false)

const searchFilm = async (query) => {
  isSearching.value = !!query
  await store.dispatch('fetchFilmsList', query)
}

onMounted(async () => {
  await store.dispatch('fetchFavoriteFilmsList')
  await store.dispatch('fetchFilmsList')
  isLoading.value = false
})
</script>

<template>
  <div>
    <Search @search="searchFilm" />
    
    <div v-if="!isLoading && store.getters.films.length">
      <CardList :films="store.getters.films" :favorites="store.getters.favorites" />
    </div>

    <div v-else-if="isLoading">
      <h2>Загрузка...</h2>
    </div>

    <div v-else>
      <h1>По вашему запросу фильмы не найдены</h1>
    </div>

    <Pagination v-if="!isSearching" />
  </div>
</template>
