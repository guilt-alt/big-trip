import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const checkFileNames = ({ name }) => {

  if (/icons/.test(name ?? '')) return 'assets/img/icons/[name][extname]';

  if (/photos/.test(name ?? '')) return 'assets/img/photos/[name][extname]';

  if (/\.(jpe?g|png|webp)/.test(name ?? '')) return 'assets/img/[name][extname]';

  if (/\.(woff|woff2)/.test(name ?? '')) return 'assets/fonts/[name][extname]';

  return 'assets/[name]-[hash][extname]';
}

const aliasList = {
  '@': resolve(__dirname, './src'),
  '@api': resolve(__dirname, './src/js/api'),
  '@utils': resolve(__dirname, './src/js/utils'),
  '@mocks': resolve(__dirname, './src/js/mocks'),
  '@model': resolve(__dirname, './src/js/model'),
  '@view': resolve(__dirname, './src/js/view'),
  '@presenter': resolve(__dirname, './src/js/presenter')
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
    rollupOptions: {
      output: {
        filename: '[name]-[contenthash][extname]',
        assetFileNames: checkFileNames
      }
    },
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
