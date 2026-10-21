import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { PRODUCT_QUERY_KEYS } from '@acme/product/shared/product-constants';
import type { CreateProductDto, UpdateProductDto } from '@acme/product/shared/product-types';
import type { PaginationParams } from '@core/shared/types';
import { ProductApiService } from './ProductApiService';

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ProductApiService.delete(id),
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
            // Drop (not just invalidate) the detail entry: a back-button or
            // bookmark visit must refetch and 404, not render the cached entity.
            queryClient.removeQueries({ queryKey: PRODUCT_QUERY_KEYS.detail(id) });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
