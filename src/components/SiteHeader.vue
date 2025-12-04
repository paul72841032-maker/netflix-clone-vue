<template>
  <header class="sticky top-0 z-50 backdrop-blur bg-black/40 ring-1 ring-white/10">
    <div class="max-w-[1200px] mx-auto px-4 h-14 flex items-center gap-6">
      <button class="text-lg font-black" @click="$router.push('/')">
        <span class="text-red-600">N</span> WSDflix
      </button>

      <nav class="flex gap-4 text-sm text-neutral-300">
        <RouterLink to="/" class="hover:text-white">홈</RouterLink>
        <RouterLink to="/popular" class="hover:text-white">인기</RouterLink>
        <RouterLink to="/search" class="hover:text-white">검색</RouterLink>
        <RouterLink to="/wishlist" class="hover:text-white">보관함</RouterLink>
      </nav>

      <div class="ml-auto">
        <RouterLink to="/signin" class="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20">로그인</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
