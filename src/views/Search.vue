<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap items-end gap-3">
      <input v-model="q" placeholder="제목 검색..." class="input" />
      <select v-model="genre" class="input">
        <option value="">장르</option>
        <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
      <select v-model="sort" class="input">
        <option value="">정렬</option>
        <option value="popularity.desc">인기순</option>
        <option value="vote_average.desc">평점순</option>
        <option value="primary_release_date.desc">개봉년도↓</option>
      </select>
      <button class="btn-prim" @click="search">검색</button>
      <button class="btn-off" @click="reset">초기화</button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      <MovieCard v-for="m in results" :key="m.id" :movie="{id:m.id,title:m.title,poster_path:m.poster_path}" />
    </div>
    <div v-if="loading" class="py-6 opacity-80">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { endpoints, fetchMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard.vue'

const q = ref(''); const genre = ref<any>(''); const sort = ref('')
const results = ref<any[]>([]); const loading = ref(false)

const genres = [
  { id: 28, name: '액션' }, { id: 35, name: '코미디' }, { id: 18, name: '드라마' },
  { id: 27, name: '공포' }, { id: 10749, name: '로맨스' }, { id: 878, name: 'SF' }
]

async function search(){
  loading.value = true
  let url = q.value ? endpoints.search(q.value, 1, sort.value || undefined) : endpoints.discoverByGenre(Number(genre.value||0) || 28)
  const data = await fetchMovies(url)
  let list = data.results || []
  // 클라이언트 필터/정렬 예시 (API와 혼용 가능)
  if(genre.value) list = list.filter((m:any)=> (m.genre_ids||[]).includes(Number(genre.value)))
  results.value = list
  loading.value = false
}
function reset(){ q.value=''; genre.value=''; sort.value=''; results.value=[] }
</script>

<style scoped>
.input{ @apply rounded bg-neutral-800 px-3 py-2; }
.btn-prim{ @apply rounded bg-emerald-600 px-3 py-2; }
.btn-off{ @apply rounded bg-neutral-700 px-3 py-2; }
</style>
