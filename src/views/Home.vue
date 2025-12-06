<template>
  <main class="bg-black text-white min-h-screen">
    <!-- ✅ 맨 위 큰 포스터 (Hero Section) -->
    <HeroMovie />

    <!-- ✅ 캐러셀 섹션들 -->
    <section class="px-6 py-10 space-y-12">
      <MovieRow title="인기 영화" :items="popular" />
      <MovieRow title="상영 중" :items="nowPlaying" />
      <MovieRow title="최고 평점" :items="topRated" />
      <MovieRow title="다가오는 영화" :items="upcoming" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MovieRow from './partials/MovieRow.vue'
import HeroMovie from '../components/HeroMovie.vue'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

// 각 섹션별 영화 데이터
const popular = ref<any[]>([])
const nowPlaying = ref<any[]>([])
const topRated = ref<any[]>([])
const upcoming = ref<any[]>([])

async function fetchMovies(endpoint: string, target: any) {
  try {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=ko-KR&page=1`
    )
    const data = await res.json()
    target.value = data.results
  } catch (e) {
    console.error(`❌ ${endpoint} 불러오기 실패`, e)
  }
}

onMounted(async () => {
  await Promise.all([
    fetchMovies('popular', popular),
    fetchMovies('now_playing', nowPlaying),
    fetchMovies('top_rated', topRated),
    fetchMovies('upcoming', upcoming),
  ])
})
</script>

<style scoped>
main {
  background-color: #0b0b0b;
}
</style>
