import type { DeviceStatus } from './device.interface';

export interface CreateDeviceDto {
    serial: string;
    status?: DeviceStatus;
    location: string;
}

export interface UpdateDeviceDto {
    serial?: string;
    status?: DeviceStatus;
    location?: string;
}
