// packages/hooks/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/useFormattedText.ts'],
  dts: true,
  format: ['esm', 'cjs'],
  splitting: false,
  clean: true,
  external: ['react'],
});
