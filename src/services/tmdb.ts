// src/api/tmdb.ts
import axios from 'axios'

const BASE = 'https://api.themoviedb.org/3'
const LANG = 'ko-KR'

// 1) 키 읽기: ENV 우선, 없으면 localStorage 보조
function readKey(): string | null {
    const fromEnv = import.meta.env.VITE_TMDB_API_KEY?.toString().trim()
    if (fromEnv) return fromEnv
    const fromLS = (typeof localStorage !== 'undefined'
        ? localStorage.getItem('TMDb-Key')
        : null)?.toString().trim()
    return fromLS || null
}

// 2) 키 보장: 없으면 즉시 에러 (빌드/배포 설정 문제를 빨리 발견)
function key(): string {
    const k = readKey()
    if (!k) {
        console.error('❌ TMDB API 키가 없습니다. .env 또는 localStorage("TMDb-Key")를 확인하세요.')
        throw new Error('Missing TMDB API key')
    }
    return k
}

export const endpoints = {
    popular:      (page = 1) => `${BASE}/movie/popular?api_key=${key()}&language=${LANG}&page=${page}`,
    nowPlaying:   (page = 1) => `${BASE}/movie/now_playing?api_key=${key()}&language=${LANG}&page=${page}`,
    topRated:     (page = 1) => `${BASE}/movie/top_rated?api_key=${key()}&language=${LANG}&page=${page}`,
    upcoming:     (page = 1) => `${BASE}/movie/upcoming?api_key=${key()}&language=${LANG}&page=${page}`,
    discoverByGenre: (genre: number, page = 1) =>
        `${BASE}/discover/movie?api_key=${key()}&language=${LANG}&page=${page}&with_genres=${genre}`,
    search: (q: string, page = 1, sort?: string) =>
        `${BASE}/search/movie?api_key=${key()}&language=${LANG}&page=${page}&query=${encodeURIComponent(q)}${sort ? `&sort_by=${sort}` : ''}`
}

export async function fetchMovies<T = any>(url: string): Promise<T> {
    // 3) 네트워크/권한 오류를 콘솔에서 쉽게 보이도록
    try {
        const res = await axios.get(url)
        return res.data
    } catch (e: any) {
        const status = e?.response?.status
        const data   = e?.response?.data
        console.error('❌ TMDB 요청 실패:', status, data || e?.message)
        throw e
    }
}
