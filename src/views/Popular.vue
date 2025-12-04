<template>
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-lg font-semibold">대세 콘텐츠</h2>
    <div class="flex gap-2">
      <button :class="mode==='table' ? 'btn-on' : 'btn-off'" @click="setMode('table')">Table</button>
      <button :class="mode==='infinite' ? 'btn-on' : 'btn-off'" @click="setMode('infinite')">Infinite</button>
    </div>
  </div>

  <div v-if="mode==='table'">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 overflow-hidden">
      <MovieCard v-for="m in pageItems" :key="m.id" :movie="toMovie(m)" />
    </div>
    <div class="flex items-center gap-2 justify-center mt-4">
      <button class="btn-off" :disabled="page===1" @click="page--">Prev</button>
      <span class="px-2">{{ page }}</span>
      <button class="btn-off" @click="page++">Next</button>
    </div>
  </div>

  <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
    <MovieCard v-for="m in items" :key="m.id" :movie="toMovie(m)" />
    <div ref="sentinel" class="col-span-full text-center py-6 opacity-80">{{ loading ? 'Loading...' : '끝까지 내려보세요' }}</div>
    <button v-show="showTop" class="fixed bottom-6 right-6 px-4 py-2 rounded bg-neutral-800/80" @click="scrollTo(0)">Top</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { endpoints, fetchMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard.vue'

type Mode = 'table'|'infinite'
const mode = ref<Mode>('table')
const items = ref<any[]>([])
const page = ref(1)
const pageItems = computed(()=> items.value.slice((page.value-1)*24, (page.value)*24))
const loading = ref(false)
const sentinel = ref<HTMLElement|null>(null)
const showTop = ref(false)

function toMovie(m:any){ return { id:m.id, title:m.title, poster_path:m.poster_path } }
function setMode(m:Mode){ mode.value = m; window.scrollTo({top:0}) }

async function load(pageNum:number){
  loading.value = true
  const data = await fetchMovies(endpoints.popular(pageNum))
  items.value.push(...data.results)
  loading.value = false
}

onMounted(async ()=>{
  await load(1)
  // infinite-scroll observe
  const io = new IntersectionObserver(async (ents)=>{
    if(ents[0].isIntersecting && mode.value==='infinite' && !loading.value){
      await load(Math.floor(items.value.length/20)+1)
    }
  })
  if(sentinel.value) io.observe(sentinel.value)
  window.addEventListener('scroll', ()=>{ showTop.value = window.scrollY > 600 })
})
watch(page, (p)=>{ if(mode.value==='table'){ scrollTo(0) } })
function scrollTo(top:number){ window.scrollTo({ top, behavior:'smooth' }) }
</script>

<style scoped>
.btn-on{ @apply px-3 py-1 rounded bg-emerald-600; }
.btn-off{ @apply px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50; }
</style>
