<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const delayedSearch = debounce(() => {
  emit('search', searchQuery.value)
}, 800)

const handleInput = () => delayedSearch()
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">ТОП 250</h2>

    <div class="relative">
      <img class="absolute left-4 top-3" src="/search.svg" alt="search" />
      <input
        v-model="searchQuery"
        @input="handleInput"
        class="bg-violet-50 border rounded-md py-2 pl-9 md:pl-11 outline-none focus:border-gray-400"
        type="search"
        placeholder="Поиск по всем..."
      />
    </div>
  </div>
</template>
