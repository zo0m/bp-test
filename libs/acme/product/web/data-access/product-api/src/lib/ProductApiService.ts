import { apiClient } from '@core/web/data-access';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';
import type {
    Product,
    CreateProductDto,
    UpdateProductDto,
} from '@acme/product/shared/product-types';
import { PRODUCT_API_PATH } from '@acme/product/shared/product-constants';

export class ProductApiService {
    private static readonly BASE_PATH = PRODUCT_API_PATH;

    static async getAll(params: PaginationParams = {}): Promise<PaginatedResponse<Product>> {
        const response = await apiClient.get<PaginatedResponse<Product>>(this.BASE_PATH, {
            params,
        });
        return response.data;
    }

    static async create(data: CreateProductDto): Promise<Product> {
        const response = await apiClient.post<Product>(this.BASE_PATH, data);
        return response.data;
    }

    static async getById(id: string): Promise<Product> {
        const response = await apiClient.get<Product>(`${this.BASE_PATH}/${id}`);
        return response.data;
    }

    static async update(id: string, data: UpdateProductDto): Promise<Product> {
        const response = await apiClient.patch<Product>(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }

    static async delete(id: string): Promise<void> {
        await apiClient.delete(`${this.BASE_PATH}/${id}`);
    }
}
