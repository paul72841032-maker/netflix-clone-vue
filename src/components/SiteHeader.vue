<template>
  <header class="sticky top-0 z-50 backdrop-blur bg-black/40 ring-1 ring-white/10">
    <div class="max-w-[1200px] mx-auto px-4 h-14 flex items-center gap-6">
      <button class="text-lg font-black" @click="$router.push('/')">
        <span class="text-red-600">N</span> Netflix
      </button>

      <nav class="flex gap-4 text-sm text-neutral-300">
        <RouterLink to="/" class="hover:text-white">홈</RouterLink>
        <RouterLink to="/popular" class="hover:text-white">인기</RouterLink>
        <RouterLink to="/search" class="hover:text-white">검색</RouterLink>
        <RouterLink to="/wishlist" class="hover:text-white">보관함</RouterLink>
      </nav>

      <div class="ml-auto flex items-center gap-3">
        <span v-if="loginId" class="hidden sm:block text-xs opacity-80">{{ loginId }}</span>
        <button
            v-if="loggedIn"
            class="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
            @click="onLogout"
        >
          로그아웃
        </button>
        <RouterLink
            v-else
            to="/signin"
            class="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
        >
          로그인
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

// 로그인 상태 실시간 감시
const loggedIn = ref(false)
const loginId = ref('')

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn.value = true
      loginId.value = user.email || ''
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('loginId', user.email || '')
    } else {
      loggedIn.value = false
      loginId.value = ''
      localStorage.setItem('loggedIn', 'false')
      localStorage.removeItem('loginId')
    }
  })
})

async function onLogout() {
  await signOut(auth)
  loggedIn.value = false
  loginId.value = ''
  localStorage.setItem('loggedIn', 'false')
  localStorage.removeItem('loginId')
}
</script>
