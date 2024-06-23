<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const props = defineProps(['nameRu', 'posterUrl', 'kinoId', 'year', 'isFavorite'])
const store = useStore()

const toggleFavoriteFilm = async () => {
  const film = {
    nameRu: props.nameRu,
    kinoId: props.kinoId,
    isFavorite: !props.isFavorite,
    year: Number(props.year),
    posterUrl: props.posterUrl
  }
  await store.dispatch('toggleFavoriteFilm', film)
  await store.dispatch('fetchFavoriteFilmsList')
}

const requestAboutEntry = () => {
  alert('Войдите в профиль, чтобы добавить фильм в избранное')
}

onMounted(async () => {
  await store.dispatch('checkAuthState')
})
</script>

<template>
  <article
    class="relative bg-violet-50 border border-slate-100 rounded-3xl p-4 md:cursor-pointer md:hover:-translate-y-2 md:hover:shadow-xl transition xl:p-6 2xl:p-12"
  >
    <img :src="props.posterUrl" alt="image" class="rounded-3xl h-auto" />
    <b class="mt-2">{{ props.nameRu }}</b>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <p>{{ props.year }}</p>
      </div>
      <img
        v-if="store.getters.isLoggedIn"
        @click="toggleFavoriteFilm"
        :src="props.isFavorite ? '/films/like-2.svg' : '/films/like-1.svg'"
        alt="like"
      />
      <img v-else @click="requestAboutEntry" src="/like-1.svg" alt="like" />
    </div>
  </article>
</template>
