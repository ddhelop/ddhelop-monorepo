import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: false, // or false, 실험적으로 둘 다 시도해보기
  },
  external: ['react'],
  esbuildOptions(options) {
    options.jsx = 'transform'; // 💡 핵심
  },
});
