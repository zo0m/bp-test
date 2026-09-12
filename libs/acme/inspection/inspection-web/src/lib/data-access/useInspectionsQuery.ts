import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { INSPECTION_QUERY_KEYS } from '@acme/inspection/shared/inspection-shared';
import type {
    CreateInspectionDto,
    UpdateInspectionDto,
} from '@acme/inspection/shared/inspection-shared';
import type { PaginationParams } from '@core/shared/types';
import { InspectionApiService } from './InspectionApiService';

export function useInspectionsQuery(params?: MaybeRef<PaginationParams>) {
    return useQuery({
        queryKey: computed(() => INSPECTION_QUERY_KEYS.list(toValue(params) ?? {})),
        queryFn: () => InspectionApiService.getAll(toValue(params) ?? {}),
        // Page changes keep the previous rows visible instead of flashing an
        // empty table and collapsing the paginator.
        placeholderData: keepPreviousData,
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
