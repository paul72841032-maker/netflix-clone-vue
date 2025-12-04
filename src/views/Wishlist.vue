<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">내가 찜한 리스트</h2>
    <div v-if="items.length===0" class="opacity-80">아직 찜한 영화가 없어요.</div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      <MovieCard v-for="m in items" :key="m.id" :movie="m" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WishlistManager } from '../composables/useWishlist'
import MovieCard from '../components/MovieCard.vue'
const mgr = new WishlistManager()
const items = mgr.items
</script>
