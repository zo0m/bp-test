import { apiClient } from '@core/web/data-access';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';
import type {
    Organization,
    CreateOrganizationDto,
    UpdateOrganizationDto,
} from '@acme/organization/shared/organization-shared';
import { ORGANIZATION_API_PATH } from '@acme/organization/shared/organization-shared';

export class OrganizationApiService {
    private static readonly BASE_PATH = ORGANIZATION_API_PATH;

    static async getAll(params: PaginationParams = {}): Promise<PaginatedResponse<Organization>> {
        const response = await apiClient.get<PaginatedResponse<Organization>>(this.BASE_PATH, {
            params,
        });
        return response.data;
    }

    static async getById(id: string): Promise<Organization> {
        const response = await apiClient.get<Organization>(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
}
