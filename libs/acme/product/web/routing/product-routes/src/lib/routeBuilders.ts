import type { RouteLocationRaw } from 'vue-router';
import { PRODUCT_ROUTES } from './routes';

export const productRoutes = {
    create(): RouteLocationRaw {
        return { name: PRODUCT_ROUTES.CREATE };
    },
    details(id: string): RouteLocationRaw {
        return { name: PRODUCT_ROUTES.DETAILS, params: { id } };
    },
    edit(id: string): RouteLocationRaw {
        return { name: PRODUCT_ROUTES.EDIT, params: { id } };
    },
    list(): RouteLocationRaw {
        return { name: PRODUCT_ROUTES.LIST };
    },
};
