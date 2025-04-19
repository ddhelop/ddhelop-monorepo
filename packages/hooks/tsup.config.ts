import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react'],
  esbuildOptions(options) {
    options.jsx = 'transform'; // 💡 핵심: esbuild에 직접 전달
  },
});
