import { apiClient } from '@core/web/data-access';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';
import type {
    Inspection,
    CreateInspectionDto,
    UpdateInspectionDto,
} from '@acme/inspection/shared/inspection-shared';
import { INSPECTION_API_PATH } from '@acme/inspection/shared/inspection-shared';

export class InspectionApiService {
    private static readonly BASE_PATH = INSPECTION_API_PATH;

    static async getAll(params: PaginationParams = {}): Promise<PaginatedResponse<Inspection>> {
        const response = await apiClient.get<PaginatedResponse<Inspection>>(this.BASE_PATH, {
            params,
        });
        return response.data;
    }

    static async create(data: CreateInspectionDto): Promise<Inspection> {
        const response = await apiClient.post<Inspection>(this.BASE_PATH, data);
        return response.data;
    }

    static async getById(id: string): Promise<Inspection> {
        const response = await apiClient.get<Inspection>(`${this.BASE_PATH}/${id}`);
        return response.data;
    }

    /** Transition */
    static async transition(id: string): Promise<Inspection> {
        const response = await apiClient.post<Inspection>(`${this.BASE_PATH}/${id}/transition`);
        return response.data;
    }
}
