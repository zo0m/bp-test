import type { App, Plugin } from 'vue';
import type { Router } from 'vue-router';
import { parseApiError } from './parse';

export interface ErrorHandlerOptions {
    router?: Router;
    /** Where an unrecoverable failure sends the user. */
    errorRoute?: string;
}

export interface ErrorReportOptions {
    suppressToast?: boolean;
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $errorReport: (error: unknown, source: string, options?: ErrorReportOptions) => void;
    }
}

/**
 * One place every unhandled failure arrives: Vue's own error handler, window
 * events, and the query/mutation caches through `$errorReport`.
 *
 * It deliberately does not render anything. A generated application decides how
 * to show a failure; this decides that none of them are lost silently.
 */
export const ErrorHandlerPlugin: Plugin<[ErrorHandlerOptions?]> = {
    install(app: App, options: ErrorHandlerOptions = {}) {
        const report = (error: unknown, source: string, reportOptions: ErrorReportOptions = {}) => {
            const parsed = parseApiError(error);
            console.error(`[${source}] ${parsed.message}`, error);

            // An expired session is the one failure worth acting on centrally.
            if (parsed.isAuthError && options.router) {
                void options.router.push({ name: 'error', query: { reason: parsed.code } });
                return;
            }
            if (reportOptions.suppressToast) return;
        };

        app.config.globalProperties.$errorReport = report;

        app.config.errorHandler = (error, _instance, info) => {
            report(error, `vue:${info}`);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('unhandledrejection', (event) => {
                report(event.reason, 'unhandledrejection');
            });
        }
    },
};
