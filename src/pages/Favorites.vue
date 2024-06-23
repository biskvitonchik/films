<script setup>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

const store = useStore()
const isLoadingFavoritesList = ref(true)

const clearFavoritesList = async () => {
  try {
    await store.dispatch('deleteAllFavoritesList')
  } catch (error) {
    console.error('Ошибка при очистке избранных фильмов:', error)
  }
}

onMounted(async () => {
  await store.dispatch('checkAuthState')
  if (store.getters.isLoggedIn) {
    await store.dispatch('fetchFavoriteFilmsList')
    isLoadingFavoritesList.value = false
  } else {
    isLoadingFavoritesList.value = false
  }
})
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 v-if="isLoadingFavoritesList" class="mb-5">Загрузка избранных фильмов...</h1>
      <h1 v-else-if="store.state.favorites != 0" class="mb-5">
        {{
          store.getters.isLoggedIn 
            ? 'Избранные фильмы:' 
            : 'Войдите в профиль, чтобы увидеть избранные фильмы'
        }}
      </h1>

      <h1 v-else class="mb-5">
        {{
          store.getters.isLoggedIn
            ? 'У вас нет избранных фильмов'
            : 'Войдите в профиль, чтобы увидеть избранные фильмы'
        }}
      </h1>
    </div>

    <div v-if="store.state.favorites != 0 && store.getters.isLoggedIn">
      <button class="rounded-xl px-1 duration-300 hover:bg-violet-100" @click="clearFavoritesList">
        Очистить избранное
      </button>
    </div>
  </div>

  <div class="flex flex-wrap" v-if="store.getters.isLoggedIn">
    <div
      v-for="film in store.getters.favorites"
      :key="film.id"
      class="md:w-1/4 p-6 w-2/4 bg-violet-50 border border-slate-100 rounded-3xl cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
    >
      <div></div>
      <img class="rounded-3xl" :src="film.posterUrl" alt="image" />
      <div>
        <b class="flex justify-center">{{ film.nameRu }}</b>

        <p class="flex justify-center mt-2">{{ film.year }}</p>
      </div>
    </div>
  </div>
</template>
