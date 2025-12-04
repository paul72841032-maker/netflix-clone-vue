<template>
  <!-- Hero -->
  <section v-if="hero" class="relative mb-10">
    <img :src="heroBackdrop" class="w-full h-[48vh] object-cover rounded-2xl ring-1 ring-white/10" />
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 to-black/0"></div>
    <div class="absolute bottom-6 left-6 max-w-xl">
      <h2 class="text-3xl sm:text-4xl font-black drop-shadow-md">{{ hero.title }}</h2>
      <p class="mt-2 line-clamp-3 text-neutral-200/90">{{ hero.overview }}</p>
      <div class="mt-4 flex gap-3">
        <button class="btn-primary">재생</button>
        <button class="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">자세히</button>
      </div>
    </div>
  </section>

  <!-- Rows -->
  <MovieRow title="지금 상영중" :items="nowPlaying" />
  <MovieRow title="인기 급상승" :items="popular" />
  <MovieRow title="평점 최상" :items="topRated" />
  <MovieRow title="개봉 예정" :items="upcoming" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { endpoints, fetchMovies } from '../services/tmdb'
import MovieRow from './partials/MovieRow.vue'

const nowPlaying = ref<any[]>([])
const popular = ref<any[]>([])
const topRated = ref<any[]>([])
const upcoming = ref<any[]>([])
const hero = ref<any | null>(null)
const heroBackdrop = ref('')

onMounted(async ()=>{
  const [np, pop, top, up] = await Promise.all([
    fetchMovies(endpoints.nowPlaying()),
    fetchMovies(endpoints.popular()),
    fetchMovies(endpoints.topRated()),
    fetchMovies(endpoints.upcoming())
  ])
  nowPlaying.value = np.results
  popular.value = pop.results
  topRated.value = top.results
  upcoming.value = up.results

  hero.value = pop.results?.[0] || np.results?.[0]
  heroBackdrop.value = hero.value?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${hero.value.backdrop_path}`
      : ''
})
</script>
