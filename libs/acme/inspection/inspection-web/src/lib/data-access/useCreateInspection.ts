import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { INSPECTION_QUERY_KEYS } from '@acme/inspection/shared/inspection-shared';
import type {
    CreateInspectionDto,
    UpdateInspectionDto,
} from '@acme/inspection/shared/inspection-shared';
import type { PaginationParams } from '@core/shared/types';
import { InspectionApiService } from './InspectionApiService';

export function useCreateInspection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateInspectionDto) => InspectionApiService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: INSPECTION_QUERY_KEYS.lists() });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
