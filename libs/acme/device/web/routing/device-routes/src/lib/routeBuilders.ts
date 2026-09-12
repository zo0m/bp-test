import type { RouteLocationRaw } from 'vue-router';
import { DEVICE_ROUTES } from './routes';

export const deviceRoutes = {
    create(): RouteLocationRaw {
        return { name: DEVICE_ROUTES.CREATE };
    },
    details(id: string): RouteLocationRaw {
        return { name: DEVICE_ROUTES.DETAILS, params: { id } };
    },
    edit(id: string): RouteLocationRaw {
        return { name: DEVICE_ROUTES.EDIT, params: { id } };
    },
    list(): RouteLocationRaw {
        return { name: DEVICE_ROUTES.LIST };
    },
};
