import { useQuery } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { PRODUCT_QUERY_KEYS } from '@acme/product/shared/product-constants';
import type { CreateProductDto, UpdateProductDto } from '@acme/product/shared/product-types';
import type { PaginationParams } from '@core/shared/types';
import { ProductApiService } from './ProductApiService';

export function useProductQuery(id: MaybeRef<string | undefined>) {
    return useQuery({
        queryKey: computed(() => {
            const idValue = toValue(id);
            return idValue ? PRODUCT_QUERY_KEYS.detail(idValue) : PRODUCT_QUERY_KEYS.details();
        }),
        queryFn: () => {
            const idValue = toValue(id);
            if (!idValue) {
                throw new Error('Product ID is required');
            }
            return ProductApiService.getById(idValue);
        },
        enabled: computed(() => !!toValue(id)),
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
