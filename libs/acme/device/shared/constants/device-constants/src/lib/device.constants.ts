import type { DeviceStatus } from '@acme/device/shared/device-types';

export const DEVICE_SERIAL_MAX_LENGTH = 64;

export const DEVICE_API_PATH = '/devices';

export const DEVICE_QUERY_KEYS = {
    all: ['devices'] as const,
    lists: () => [...DEVICE_QUERY_KEYS.all, 'list'] as const,
    list: (params: object) => [...DEVICE_QUERY_KEYS.lists(), params] as const,
    details: () => [...DEVICE_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...DEVICE_QUERY_KEYS.details(), id] as const,
} as const;

/**
 * Display metadata for DeviceStatus. `tone` is the
 * model's neutral vocabulary; the component maps it onto its own scale.
 */
export const DEVICE_STATUS_CONFIG = {
    active: { label: 'Active', tone: 'success' },
    faulty: { label: 'Faulty', tone: 'danger' },
    retired: { label: 'Retired', tone: 'neutral' },
} as const satisfies Record<DeviceStatus, { label: string; tone: string }>;
export const DEVICE_DEFAULT_STATUS: DeviceStatus = 'active';
