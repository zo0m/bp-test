import { apiClient } from '@core/web/data-access';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';
import type {
    Location,
    CreateLocationDto,
    UpdateLocationDto,
} from '@acme/location/shared/location-shared';
import { LOCATION_API_PATH } from '@acme/location/shared/location-shared';

export class LocationApiService {
    private static readonly BASE_PATH = LOCATION_API_PATH;

    static async getAll(params: PaginationParams = {}): Promise<PaginatedResponse<Location>> {
        const response = await apiClient.get<PaginatedResponse<Location>>(this.BASE_PATH, {
            params,
        });
        return response.data;
    }

    static async getById(id: string): Promise<Location> {
        const response = await apiClient.get<Location>(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
}
