<script setup>
import CardFilm from '@/components/CardFilm.vue'
defineProps(['films', 'favorites'])
</script>

<template>
  <main class="grid grid-cols-2 md:grid-cols-4 gap-5">
    <CardFilm
      v-for="film in films"
      :key="film.kinopoiskId"
      :nameRu="film.nameRu"
      :posterUrl="film.posterUrl"
      :year="film.year"
      :kinopoiskId="film.kinopoiskId"
      :isFavorite="
        favorites.some(
          (f) => f.nameRu === film.nameRu && f.year == film.year && f.posterUrl === film.posterUrl
        )
      "
    />
  </main>
</template>
