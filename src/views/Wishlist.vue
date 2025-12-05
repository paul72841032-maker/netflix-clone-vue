<template>
  <section class="container-nx py-10">
    <h1 class="text-xl font-bold mb-6">내 보관함</h1>

    <!-- 보관함에 영화가 있을 때 -->
    <div
        v-if="movies.length"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
    >
      <div
          v-for="m in movies"
          :key="m.id"
          class="relative group cursor-pointer"
      >
        <!-- 포스터 이미지 -->
        <img
            :src="`https://image.tmdb.org/t/p/w342${m.poster_path}`"
            :alt="m.title"
            class="rounded-lg object-cover w-full h-[260px] transition duration-300 group-hover:brightness-90"
        />

        <!-- 그라데이션 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition"></div>

        <!-- X 버튼 (hover 시 표시) -->
        <button
            class="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full w-8 h-8 grid place-items-center ring-1 ring-white/15 opacity-0 group-hover:opacity-100 transition"
            @click.stop="remove(m.id)"
            title="보관함에서 제거"
        >
          ❌
        </button>

        <!-- 제목 -->
        <p class="mt-1.5 text-sm line-clamp-2">{{ m.title }}</p>
      </div>
    </div>

    <!-- 비어 있을 때 -->
    <p v-else class="text-neutral-400 text-sm">아직 찜한 영화가 없습니다.</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Movie = { id: number; title: string; poster_path?: string }
const movies = ref<Movie[]>([])

onMounted(() => {
  const raw = localStorage.getItem('wishlist')
  movies.value = raw ? JSON.parse(raw) : []
})

function remove(id: number) {
  movies.value = movies.value.filter((m) => m.id !== id)
  localStorage.setItem('wishlist', JSON.stringify(movies.value))
}
</script>

<style scoped>
/* hover 시 부드럽게 밝기 변경, X버튼 페이드 */
.group:hover img {
  transform: scale(1.02);
}
button {
  transition: all 0.2s ease;
}
</style>
