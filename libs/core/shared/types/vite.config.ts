/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: '../../../../node_modules/.vite/libs/core/shared/types',
    plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    test: {
        name: 'core-shared-types',
        watch: false,
        globals: true,
        environment: 'node',
        include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        passWithNoTests: true,
        coverage: {
            reportsDirectory: '../../../../coverage/libs/core/shared/types',
            provider: 'v8' as const,
        },
    },
}));
