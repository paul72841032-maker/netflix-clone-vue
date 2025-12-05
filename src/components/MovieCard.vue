<template>
  <div class="relative group">
    <!-- 포스터 -->
    <div
        class="relative rounded-lg overflow-hidden ring-1 ring-white/10 transition duration-200 cursor-pointer"
        @mouseenter="show = true"
        @mouseleave="show = false"
    >
      <img :src="img" :alt="movie.title" class="w-full h-[260px] object-cover transition duration-300 group-hover:brightness-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>

      <!-- 평점 -->
      <div class="absolute top-1.5 left-1.5 text-[11px] px-1.5 py-0.5 rounded-full bg-black/60 ring-1 ring-white/20">
        ★ {{ (movie.vote_average ?? 0).toFixed(1) }}
      </div>

      <!-- 오버레이 정보 -->
      <Transition name="fade">
        <div
            v-if="show"
            class="absolute inset-0 bg-black/70 text-white flex flex-col justify-end p-3"
        >
          <p class="text-sm font-semibold line-clamp-2 mb-2">
            {{ movie.title }}
          </p>
          <div class="flex items-center justify-between">
            <p class="text-xs text-neutral-300 line-clamp-2 flex-1 pr-3">
              {{ overview }}
            </p>
            <button
                class="rounded-full bg-white/10 hover:bg-white/30 w-9 h-9 grid place-items-center ring-1 ring-white/20"
                @click.stop="toggleWishlist"
                :aria-pressed="picked"
                :title="picked ? '관심 해제' : '관심 추가'"
            >
              <span v-if="picked">💚</span>
              <span v-else>🤍</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <p class="mt-1.5 text-sm line-clamp-2">{{ movie.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

type Movie = {
  id: number
  title: string
  poster_path?: string
  vote_average?: number
  overview?: string
  [key: string]: any
}

const props = defineProps<{ movie: Movie }>()

// 이미지
const img = computed(() =>
    props.movie.poster_path ? `https://image.tmdb.org/t/p/w342${props.movie.poster_path}` : ''
)
const overview = computed(() => props.movie.overview || '상세 설명이 없습니다.')

// 오버레이 표시 여부
const show = ref(false)

// 위시리스트 (로컬스토리지)
const STORAGE_KEY = 'wishlist'
function readList() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function writeList(list: Movie[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}
function has(id: number) {
  return readList().some((m: Movie) => m.id === id)
}

const picked = ref(false)
watchEffect(() => {
  picked.value = has(props.movie.id)
})

function toggleWishlist() {
  const list = readList()
  const idx = list.findIndex((m: Movie) => m.id === props.movie.id)
  if (idx >= 0) list.splice(idx, 1)
  else list.push(props.movie)
  writeList(list)
  picked.value = has(props.movie.id)
}
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>
