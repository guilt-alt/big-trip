import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const aliasList = {
  types: resolve(__dirname, './src/types'),
  api: resolve(__dirname, './src/api'),
  utils: resolve(__dirname, './src/utils'),
  mocks: resolve(__dirname, './src/mocks'),
  model: resolve(__dirname, './src/model'),
  view: resolve(__dirname, './src/view'),
  presenter: resolve(__dirname, './src/presenter')
}

const imageOptimizer = {
  jpg: {
    quality: 75
  },
  jpeg: {
    quality: 75
  },
  png: {
    quality: 75
  },
  webp: {
    quality: 75,
    lossles: false
  },
  avif: {
    quality: 75,
    lossles: false
  },
}

export default {
  base: '/big-trip/',
  publicDir: resolve(__dirname, './public/'),
  build: {
    outDir: resolve(__dirname, './big-trip/'),
    modulePreload: false,
  },
  server: {
    hmr: true,
    open: true
  },
  resolve: {
    alias: aliasList
  },
  plugins: [
    ViteImageOptimizer(imageOptimizer),
  ]
}
