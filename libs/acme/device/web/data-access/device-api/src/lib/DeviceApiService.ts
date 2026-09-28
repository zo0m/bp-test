import { apiClient } from '@core/web/data-access';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';
import type { Device, CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import { DEVICE_API_PATH } from '@acme/device/shared/device-constants';

export class DeviceApiService {
    private static readonly BASE_PATH = DEVICE_API_PATH;

    static async getAll(params: PaginationParams = {}): Promise<PaginatedResponse<Device>> {
        const response = await apiClient.get<PaginatedResponse<Device>>(this.BASE_PATH, {
            params,
        });
        return response.data;
    }

    static async create(data: CreateDeviceDto): Promise<Device> {
        const response = await apiClient.post<Device>(this.BASE_PATH, data);
        return response.data;
    }

    static async getById(id: string): Promise<Device> {
        const response = await apiClient.get<Device>(`${this.BASE_PATH}/${id}`);
        return response.data;
    }

    static async update(id: string, data: UpdateDeviceDto): Promise<Device> {
        const response = await apiClient.patch<Device>(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }

    static async delete(id: string): Promise<void> {
        await apiClient.delete(`${this.BASE_PATH}/${id}`);
    }

    /** Deactivate */
    static async deactivate(id: string): Promise<Device> {
        const response = await apiClient.post<Device>(`${this.BASE_PATH}/${id}/deactivate`);
        return response.data;
    }

    /** Replace */
    static async replace(
        id: string,
        data: {
            replacement: string;
            reason: string;
        },
    ): Promise<Device> {
        const response = await apiClient.post<Device>(`${this.BASE_PATH}/${id}/replace`, data);
        return response.data;
    }

    /** Move */
    static async move(
        id: string,
        data: {
            destination: string;
        },
    ): Promise<Device> {
        const response = await apiClient.post<Device>(`${this.BASE_PATH}/${id}/move`, data);
        return response.data;
    }

    /** Generate QR Code */
    static async generateQrCode(id: string): Promise<Device> {
        const response = await apiClient.get<Device>(`${this.BASE_PATH}/${id}/generate-qr-code`);
        return response.data;
    }
}
