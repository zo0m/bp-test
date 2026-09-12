export const DEVICE_ROUTES = {
    CREATE: 'device.create',
    DETAILS: 'device.details',
    EDIT: 'device.edit',
    LIST: 'device.list',
} as const;

export type DeviceRouteName = (typeof DEVICE_ROUTES)[keyof typeof DEVICE_ROUTES];
