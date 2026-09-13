import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { PRODUCT_QUERY_KEYS } from '@acme/product/shared/product-constants';
import type { CreateProductDto, UpdateProductDto } from '@acme/product/shared/product-types';
import type { PaginationParams } from '@core/shared/types';
import { ProductApiService } from './ProductApiService';

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) =>
            ProductApiService.update(id, data),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.detail(id) });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
