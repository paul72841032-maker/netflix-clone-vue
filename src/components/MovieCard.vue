<template>
  <div class="relative group">
    <div
        class="relative rounded-lg overflow-hidden ring-1 ring-white/10 transition duration-200 group-hover:-translate-y-1"
    >
      <img :src="img" :alt="movie.title" class="w-full h-[260px] object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
      <div
          class="absolute top-1.5 left-1.5 text-[11px] px-1.5 py-0.5 rounded-full bg-black/60 ring-1 ring-white/20"
      >
        ★ {{ (movie.vote_average ?? 0).toFixed(1) }}
      </div>
    </div>
    <p class="mt-1.5 text-sm line-clamp-2">{{ movie.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '../composables/useWishlist'
const props = defineProps<{ movie: Movie & { vote_average?: number; overview?: string } }>()
const img = computed(() =>
    props.movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${props.movie.poster_path}`
        : ''
)
</script>
