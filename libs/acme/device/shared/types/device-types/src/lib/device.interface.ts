export const DEVICE_STATUSES = ['active', 'faulty', 'retired'] as const;
export type DeviceStatus = (typeof DEVICE_STATUSES)[number];

export interface Device {
    id: string;
    serial: string;
    status: DeviceStatus;
    location: string;
    inspections?: string[];
    /** ISO 8601 - dates cross the JSON boundary as strings */
    createdAt: string;
    updatedAt: string;
}
