import type { App, Plugin } from 'vue';
import { VueQueryPlugin, QueryClient, QueryCache, MutationCache } from '@tanstack/vue-query';

declare module '@tanstack/vue-query' {
    interface Register {
        queryMeta: { suppressGlobalError?: boolean };
        mutationMeta: { suppressGlobalError?: boolean };
    }
}

export interface VueQueryErrorContext {
    /** True when the query or mutation opted out of the global handler. */
    suppressGlobalError: boolean;
}

export interface VueQueryConfigOptions {
    onQueryError?: (error: unknown, context: VueQueryErrorContext) => void;
    onMutationError?: (error: unknown, context: VueQueryErrorContext) => void;
}

/**
 * Installs Vue Query with one place for every failure to arrive.
 *
 * Routing errors through the caches rather than through each call site is what
 * lets a generated page stay free of error plumbing, and what lets a single
 * query opt out with `meta: { suppressGlobalError: true }`.
 */
export const VueQueryConfigPlugin: Plugin<[VueQueryConfigOptions?]> = {
    install(app: App, options: VueQueryConfigOptions = {}) {
        const queryClient = new QueryClient({
            queryCache: new QueryCache({
                onError: (error, query) =>
                    options.onQueryError?.(error, {
                        suppressGlobalError: query.meta?.suppressGlobalError === true,
                    }),
            }),
            mutationCache: new MutationCache({
                onError: (error, _variables, _context, mutation) =>
                    options.onMutationError?.(error, {
                        suppressGlobalError: mutation.meta?.suppressGlobalError === true,
                    }),
            }),
            defaultOptions: {
                queries: {
                    staleTime: 30_000,
                    retry: 1,
                },
            },
        });

        app.use(VueQueryPlugin, { queryClient });
    },
};
