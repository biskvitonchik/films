<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow p-3 border-b">
      <router-view></router-view>
    </div>
    <Footer class="w-full bg-violet-200" />
  </div>
</template>
