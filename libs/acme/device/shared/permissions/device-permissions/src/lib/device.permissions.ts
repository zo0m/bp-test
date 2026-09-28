export const DEVICE_PERMISSIONS = {
    READ: 'device.read',
    CREATE: 'device.write',
    UPDATE: 'device.write',
    DELETE: 'device.delete',
    DEACTIVATE: 'device.deactivate',
    REPLACE: 'device.replace',
    MOVE: 'device.move',
    GENERATE_QR_CODE: 'device.read',
} as const;

export type DevicePermission = (typeof DEVICE_PERMISSIONS)[keyof typeof DEVICE_PERMISSIONS];
