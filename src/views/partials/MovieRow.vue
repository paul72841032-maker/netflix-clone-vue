<template>
  <section class="mb-10 relative">
    <h3 class="text-xl font-semibold mb-3">{{ title }}</h3>

    <!-- 트랙 전체 래퍼 -->
    <div class="relative overflow-visible">
      <!-- 영화 리스트 -->
      <div
          ref="wrap"
          class="overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] scroll-smooth"
          @scroll="updateArrows"
          @wheel.passive="onWheel"
      >
        <MovieCard
            v-for="m in items"
            :key="m.id"
            class="inline-block align-top w-[180px] md:w-[200px] mr-4"
            :movie="{
            id: m.id,
            title: m.title,
            poster_path: m.poster_path,
            vote_average: m.vote_average,
            overview: m.overview
          }"
        />
      </div>

      <!-- 왼쪽 화살표 -->
      <button
          v-show="showLeft"
          class="absolute top-1/2 -translate-y-1/2 -left-10 md:-left-12 z-20
               w-10 h-10 rounded-full grid place-items-center
               bg-black/30 hover:bg-black/50 text-white
               text-3xl font-light
               ring-1 ring-white/20 shadow-sm transition"
          @click="scroll(-1)"
          aria-label="이전으로"
      >
        ‹
      </button>

      <!-- 오른쪽 화살표 -->
      <button
          v-show="showRight"
          class="absolute top-1/2 -translate-y-1/2 -right-10 md:-right-12 z-20
               w-10 h-10 rounded-full grid place-items-center
               bg-black/30 hover:bg-black/50 text-white
               text-3xl font-light
               ring-1 ring-white/20 shadow-sm transition"
          @click="scroll(1)"
          aria-label="다음으로"
      >
        ›
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import MovieCard from '../../components/MovieCard.vue'

defineProps<{ title: string; items: any[] }>()

const wrap = ref<HTMLElement | null>(null)
const showLeft = ref(false)
const showRight = ref(false)

function updateArrows() {
  const el = wrap.value
  if (!el) return
  showLeft.value = el.scrollLeft > 0
  showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scroll(dir: 1 | -1) {
  const el = wrap.value
  if (!el) return
  const amount = Math.round(el.clientWidth * 0.9) * dir
  el.scrollBy({ left: amount, behavior: 'smooth' })
}

function onWheel(e: WheelEvent) {
  const el = wrap.value
  if (!el) return
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    el.scrollLeft += e.deltaY
    updateArrows()
  }
}

function onResize() { updateArrows() }

onMounted(async () => {
  await nextTick()
  setTimeout(updateArrows, 300)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => window.removeEventListener('resize', onResize))
</script>

<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>
