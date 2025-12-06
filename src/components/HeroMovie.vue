<template>
  <section
      v-if="movie"
      class="relative w-full h-[70vh] md:h-[80vh] flex items-end text-white overflow-hidden"
  >
    <!-- 배경 이미지 -->
    <img
        :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
        :alt="movie.title"
        class="absolute inset-0 w-full h-full object-cover brightness-75"
    />

    <!-- 그라데이션 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

    <!-- 내용 -->
    <div class="relative z-10 px-8 md:px-16 pb-20 max-w-3xl">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ movie.title }}</h1>
      <p class="text-sm md:text-base text-neutral-300 line-clamp-3">
        {{ movie.overview }}
      </p>
      <div class="mt-6 flex gap-3">
        <button class="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-neutral-200 transition">
          ▶ 재생
        </button>
        <button class="bg-white/30 hover:bg-white/40 text-white px-4 py-2 rounded-md font-semibold transition">
          상세정보
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const movie = ref<any>(null)

onMounted(async () => {
  try {
    const key = import.meta.env.VITE_TMDB_API_KEY
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ko-KR&page=1`
    )
    const data = await res.json()
    movie.value = data.results?.[0] // 첫 번째 인기 영화
  } catch (e) {
    console.error('HeroMovie 불러오기 실패', e)
  }
})
</script>
