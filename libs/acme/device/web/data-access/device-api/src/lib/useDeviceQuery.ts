import { useQuery } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { DEVICE_QUERY_KEYS } from '@acme/device/shared/device-constants';
import type { CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import type { PaginationParams } from '@core/shared/types';
import { DeviceApiService } from './DeviceApiService';

export function useDeviceQuery(id: MaybeRef<string | undefined>) {
    return useQuery({
        queryKey: computed(() => {
            const idValue = toValue(id);
            return idValue ? DEVICE_QUERY_KEYS.detail(idValue) : DEVICE_QUERY_KEYS.details();
        }),
        queryFn: () => {
            const idValue = toValue(id);
            if (!idValue) {
                throw new Error('Device ID is required');
            }
            return DeviceApiService.getById(idValue);
        },
        enabled: computed(() => !!toValue(id)),
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
