<template>
  <section class="mb-8">
    <h3 class="text-xl font-semibold mb-3">{{ title }}</h3>
    <div class="overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]">
      <MovieCard
          v-for="m in items"
          :key="m.id"
          class="inline-block align-top w-[180px] md:w-[200px] mr-4"
          :movie="{ id:m.id, title:m.title, poster_path:m.poster_path, vote_average:m.vote_average, overview:m.overview }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieCard from '../../components/MovieCard.vue'
defineProps<{ title: string; items: any[] }>()
</script>

<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>
