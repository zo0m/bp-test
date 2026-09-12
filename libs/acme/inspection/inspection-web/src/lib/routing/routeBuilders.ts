import type { RouteLocationRaw } from 'vue-router';
import { INSPECTION_ROUTES } from './routes';

export const inspectionRoutes = {
    create(): RouteLocationRaw {
        return { name: INSPECTION_ROUTES.CREATE };
    },
    details(id: string): RouteLocationRaw {
        return { name: INSPECTION_ROUTES.DETAILS, params: { id } };
    },
    list(): RouteLocationRaw {
        return { name: INSPECTION_ROUTES.LIST };
    },
};
