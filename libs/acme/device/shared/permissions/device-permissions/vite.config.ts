/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir:
        '../../../../../../node_modules/.vite/libs/acme/device/shared/permissions/device-permissions',
    plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    test: {
        name: 'device-permissions',
        watch: false,
        globals: true,
        environment: 'node',
        include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        passWithNoTests: true,
        coverage: {
            reportsDirectory:
                '../../../../../../coverage/libs/acme/device/shared/permissions/device-permissions',
            provider: 'v8' as const,
        },
    },
}));
