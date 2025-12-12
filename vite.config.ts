import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite 설정 (Pages 배포 시 base만 바꾸면 됨)
export default defineConfig({
    plugins: [vue()],
    base: process.env.VITE_APP_BASE || '/netflix-clone-vue/', // ★ GitHub Pages 경로
})
