import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // your existing setting
      disableOxcRecommendation: true, // suppress OXC recommendation warnings
    }),
  ],
  test: {
    environment: 'jsdom', // simulate browser environment for Vitest
    globals: true, // enable global test APIs like describe, it, expect
    setupFiles: ['./src/setupTests.js'], // optional: setup file for global mocks or configs
    include: [
      'src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/main.jsx', 'src/index.css'],
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
    },
  },
  resolve: {
    alias: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // mock CSS imports in tests
      '\\.(gif|ttf|eot|svg|png)$': '/src/__mocks__/fileMock.js', // mock assets in tests
    },
  },
});
