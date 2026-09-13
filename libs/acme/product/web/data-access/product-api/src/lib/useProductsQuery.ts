import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { PRODUCT_QUERY_KEYS } from '@acme/product/shared/product-constants';
import type { CreateProductDto, UpdateProductDto } from '@acme/product/shared/product-types';
import type { PaginationParams } from '@core/shared/types';
import { ProductApiService } from './ProductApiService';

export function useProductsQuery(params?: MaybeRef<PaginationParams>) {
    return useQuery({
        queryKey: computed(() => PRODUCT_QUERY_KEYS.list(toValue(params) ?? {})),
        queryFn: () => ProductApiService.getAll(toValue(params) ?? {}),
        // Page changes keep the previous rows visible instead of flashing an
        // empty table and collapsing the paginator.
        placeholderData: keepPreviousData,
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
