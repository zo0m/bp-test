import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { LOCATION_QUERY_KEYS } from '@acme/location/shared/location-shared';
import type { CreateLocationDto, UpdateLocationDto } from '@acme/location/shared/location-shared';
import type { PaginationParams } from '@core/shared/types';
import { LocationApiService } from './LocationApiService';

export function useLocationsQuery(params?: MaybeRef<PaginationParams>) {
    return useQuery({
        queryKey: computed(() => LOCATION_QUERY_KEYS.list(toValue(params) ?? {})),
        queryFn: () => LocationApiService.getAll(toValue(params) ?? {}),
        // Page changes keep the previous rows visible instead of flashing an
        // empty table and collapsing the paginator.
        placeholderData: keepPreviousData,
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
