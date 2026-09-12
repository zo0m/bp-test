import { createApp } from 'vue';
import { PrimeVuePlugin } from '@core/web/ui';
import { VueQueryConfigPlugin } from '@core/web/data-access';
import { ErrorHandlerPlugin } from '@core/web/errors';
import App from './app/App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(PrimeVuePlugin);
// Query and mutation failures route into the global error pipeline installed by
// ErrorHandlerPlugin below; $errorReport is resolved lazily at error time.
app.use(VueQueryConfigPlugin, {
    onQueryError: (error, context) =>
        app.config.globalProperties.$errorReport?.(error, 'query', {
            suppressToast: context.suppressGlobalError,
        }),
    onMutationError: (error, context) =>
        app.config.globalProperties.$errorReport?.(error, 'mutation', {
            suppressToast: context.suppressGlobalError,
        }),
});
app.use(ErrorHandlerPlugin, { router });
app.mount('#root');

// a human changed this
