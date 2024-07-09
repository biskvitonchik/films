<script setup>
import CardFilm from '@/components/CardFilm.vue'
defineProps(['films', 'favorites'])
</script>

<template>
  <main class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-5">
    <CardFilm
      v-for="film in films"
      :key="film.kinopoiskId || film.filmId"
      :nameRu="film.nameRu"
      :posterUrl="film.posterUrl"
      :year="film.year"
      :kinoId="film.kinopoiskId || film.filmId"
      :isFavorite="favorites.some(f => f.kinoId === (film.kinopoiskId || film.filmId))"
    />
  </main>
</template>
