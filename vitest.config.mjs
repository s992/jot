import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: './vitest.global-setup.mjs',
    globals: true,
    environment: 'jsdom',
  },
});
