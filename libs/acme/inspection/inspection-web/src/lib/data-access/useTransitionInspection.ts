import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { INSPECTION_QUERY_KEYS } from '@acme/inspection/shared/inspection-shared';
import type {
    CreateInspectionDto,
    UpdateInspectionDto,
} from '@acme/inspection/shared/inspection-shared';
import type { PaginationParams } from '@core/shared/types';
import { InspectionApiService } from './InspectionApiService';

/** Transition */
export function useTransitionInspection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => InspectionApiService.transition(id),
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: INSPECTION_QUERY_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: INSPECTION_QUERY_KEYS.detail(id) });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
