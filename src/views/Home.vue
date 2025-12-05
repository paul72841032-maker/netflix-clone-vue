<template>
  <main class="container-nx py-8">
    <!-- 인기 영화 -->
    <MovieRow title="🔥 인기 영화" :items="popular" />

    <!-- 최신 영화 -->
    <MovieRow title="🆕 최신 개봉작" :items="nowPlaying" />

    <!-- 평점 높은 영화 -->
    <MovieRow title="⭐ 평점 높은 영화" :items="topRated" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MovieRow from './partials/MovieRow.vue'

const popular = ref<any[]>([])
const nowPlaying = ref<any[]>([])
const topRated = ref<any[]>([])

const apiKey = import.meta.env.VITE_TMDB_API_KEY
const lang = 'ko-KR'

async function fetchMovies(endpoint: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=${lang}`)
  const data = await res.json()
  return data.results
}

onMounted(async () => {
  popular.value = await fetchMovies('popular')
  nowPlaying.value = await fetchMovies('now_playing')
  topRated.value = await fetchMovies('top_rated')
})
</script>
