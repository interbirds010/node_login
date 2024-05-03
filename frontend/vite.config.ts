import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // /api를 삭제하고 백엔드로 보내고 싶을 경우 사용
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
