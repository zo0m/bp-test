import { createRouter, createWebHistory } from 'vue-router';
import { NotFoundPage, ErrorPage } from '@core/web/errors';
import { DEVICE_ROUTES } from '@acme/device/web/device-routes';
import { LOCATION_ROUTES } from '@acme/location/web/location-web';
import { INSPECTION_ROUTES } from '@acme/inspection/web/inspection-web';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/devices/create',
            name: DEVICE_ROUTES.CREATE,
            component: () =>
                import('@acme/device/web/device-pages').then((m) => m.DeviceCreatePage),
        },
        {
            path: '/devices/:id',
            name: DEVICE_ROUTES.DETAILS,
            component: () =>
                import('@acme/device/web/device-pages').then((m) => m.DeviceDetailsPage),
        },
        {
            path: '/devices/:id/edit',
            name: DEVICE_ROUTES.EDIT,
            component: () => import('@acme/device/web/device-pages').then((m) => m.DeviceEditPage),
        },
        {
            path: '/devices',
            name: DEVICE_ROUTES.LIST,
            component: () => import('@acme/device/web/device-pages').then((m) => m.DeviceListPage),
        },
        {
            path: '/inspections/create',
            name: INSPECTION_ROUTES.CREATE,
            component: () =>
                import('@acme/inspection/web/inspection-web').then((m) => m.InspectionCreatePage),
        },
        {
            path: '/inspections/:id',
            name: INSPECTION_ROUTES.DETAILS,
            component: () =>
                import('@acme/inspection/web/inspection-web').then((m) => m.InspectionDetailsPage),
        },
        {
            path: '/inspections',
            name: INSPECTION_ROUTES.LIST,
            component: () =>
                import('@acme/inspection/web/inspection-web').then((m) => m.InspectionListPage),
        },
        {
            path: '/error',
            name: 'error',
            component: ErrorPage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage,
        },
    ],
});

export default router;
