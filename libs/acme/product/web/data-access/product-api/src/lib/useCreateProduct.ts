import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { PRODUCT_QUERY_KEYS } from '@acme/product/shared/product-constants';
import type { CreateProductDto, UpdateProductDto } from '@acme/product/shared/product-types';
import type { PaginationParams } from '@core/shared/types';
import { ProductApiService } from './ProductApiService';

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProductDto) => ProductApiService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
