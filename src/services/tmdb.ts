import axios from 'axios'

const BASE = 'https://api.themoviedb.org/3'
const LANG = 'ko-KR'

function key() {
    // 회원가입/로그인 시 TMDb-Key를 로컬스토리지에 저장하도록 설계
    return localStorage.getItem('TMDb-Key') || import.meta.env.VITE_TMDB_API_KEY
}

export const endpoints = {
    popular: (page = 1) => `${BASE}/movie/popular?api_key=${key()}&language=${LANG}&page=${page}`,
    nowPlaying: (page = 1) => `${BASE}/movie/now_playing?api_key=${key()}&language=${LANG}&page=${page}`,
    topRated: (page = 1) => `${BASE}/movie/top_rated?api_key=${key()}&language=${LANG}&page=${page}`,
    upcoming: (page = 1) => `${BASE}/movie/upcoming?api_key=${key()}&language=${LANG}&page=${page}`,
    discoverByGenre: (genre: number, page = 1) =>
        `${BASE}/discover/movie?api_key=${key()}&language=${LANG}&page=${page}&with_genres=${genre}`,
    search: (q: string, page = 1, sort?: string) =>
        `${BASE}/search/movie?api_key=${key()}&language=${LANG}&page=${page}&query=${encodeURIComponent(q)}${sort ? `&sort_by=${sort}` : ''}`
}

export async function fetchMovies<T=any>(url: string): Promise<T> {
    const res = await axios.get(url)
    return res.data
}
