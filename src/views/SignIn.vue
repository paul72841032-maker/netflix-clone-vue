<template>
  <section class="min-h-[70vh] grid place-items-center">
    <div class="card w-full max-w-md p-6">
      <button class="btn-primary w-full" @click="onGoogle">Google로 로그인</button>
      <p v-if="msg" class="mt-3 text-sm text-emerald-300">{{ msg }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { loginWithGoogle, completeRedirectIfNeeded } from '../services/auth'

const msg = ref('')

onMounted(async () => {
  // redirect 방식으로 돌아온 경우 처리
  const user = await completeRedirectIfNeeded()
  if (user) { msg.value = '로그인 성공!'; setTimeout(()=>location.href='/', 300) }
})

async function onGoogle() {
  try {
    const user = await loginWithGoogle()
    if (user) { msg.value = '로그인 성공!'; setTimeout(()=>location.href='/', 300) }
    // popup이 막힌 경우 redirect로 넘어가므로 여기서 바로 메시지 안 뜰 수 있음
  } catch (e: any) {
    msg.value = e?.message || '로그인 실패'
  }
}
</script>
