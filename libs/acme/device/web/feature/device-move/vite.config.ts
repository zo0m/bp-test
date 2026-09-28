/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: '../../../../../../node_modules/.vite/libs/acme/device/web/feature/device-move',
    plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    test: {
        name: 'device-move',
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        passWithNoTests: true,
        coverage: {
            reportsDirectory: '../../../../../../coverage/libs/acme/device/web/feature/device-move',
            provider: 'v8' as const,
        },
    },
}));
