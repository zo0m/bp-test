import { useQuery } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { INSPECTION_QUERY_KEYS } from '@acme/inspection/shared/inspection-shared';
import type {
    CreateInspectionDto,
    UpdateInspectionDto,
} from '@acme/inspection/shared/inspection-shared';
import type { PaginationParams } from '@core/shared/types';
import { InspectionApiService } from './InspectionApiService';

export function useInspectionQuery(id: MaybeRef<string | undefined>) {
    return useQuery({
        queryKey: computed(() => {
            const idValue = toValue(id);
            return idValue
                ? INSPECTION_QUERY_KEYS.detail(idValue)
                : INSPECTION_QUERY_KEYS.details();
        }),
        queryFn: () => {
            const idValue = toValue(id);
            if (!idValue) {
                throw new Error('Inspection ID is required');
            }
            return InspectionApiService.getById(idValue);
        },
        enabled: computed(() => !!toValue(id)),
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
