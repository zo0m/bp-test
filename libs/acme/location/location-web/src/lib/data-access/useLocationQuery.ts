import { useQuery } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { LOCATION_QUERY_KEYS } from '@acme/location/shared/location-shared';
import type { CreateLocationDto, UpdateLocationDto } from '@acme/location/shared/location-shared';
import type { PaginationParams } from '@core/shared/types';
import { LocationApiService } from './LocationApiService';

export function useLocationQuery(id: MaybeRef<string | undefined>) {
    return useQuery({
        queryKey: computed(() => {
            const idValue = toValue(id);
            return idValue ? LOCATION_QUERY_KEYS.detail(idValue) : LOCATION_QUERY_KEYS.details();
        }),
        queryFn: () => {
            const idValue = toValue(id);
            if (!idValue) {
                throw new Error('Location ID is required');
            }
            return LocationApiService.getById(idValue);
        },
        enabled: computed(() => !!toValue(id)),
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
