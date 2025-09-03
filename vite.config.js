import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['fsevents']
  },
  build: {
    rollupOptions: {
      external: ['fsevents']
    }
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/fsevents/**']
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
})
