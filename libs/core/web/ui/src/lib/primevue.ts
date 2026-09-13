import type { App, Plugin } from 'vue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Aura from '@primeuix/themes/aura';

/**
 * The component library, its theme and the two services generated pages assume
 * are present: confirmation dialogs and toasts.
 */
export const PrimeVuePlugin: Plugin<[]> = {
    install(app: App) {
        app.use(PrimeVue, {
            theme: {
                preset: Aura,
                options: { darkModeSelector: '.dark-mode' },
            },
        });
        app.use(ConfirmationService);
        app.use(ToastService);
    },
};
