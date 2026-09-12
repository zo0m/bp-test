import { defineConfig } from 'vite';

export default defineConfig({
    root: __dirname,
    test: { globals: true, environment: 'node', passWithNoTests: true },
});
