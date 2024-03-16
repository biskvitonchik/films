<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import CardList from '@/components/CardList.vue'
import Search from '@/components/Search.vue'
import Pagination from '@/components/Pagination.vue'

const store = useStore()

const searchFilm = async (query) => {
  await store.dispatch('fetchFilmsList', query)
}

onMounted(async () => {
  await store.dispatch('fetchFavoriteFilmsList')
  await store.dispatch('fetchFilmsList')
})
</script>

<template>
  <div>
    <Search @search="searchFilm" />
    <CardList :films="store.getters.films" :favorites="store.getters.favorites" />
    <Pagination />
  </div>
</template>
