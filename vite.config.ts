import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://127.0.0.1:7001/bookmark',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
