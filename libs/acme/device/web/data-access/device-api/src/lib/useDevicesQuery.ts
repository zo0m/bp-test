import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { DEVICE_QUERY_KEYS } from '@acme/device/shared/device-constants';
import type { CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import type { PaginationParams } from '@core/shared/types';
import { DeviceApiService } from './DeviceApiService';

export function useDevicesQuery(params?: MaybeRef<PaginationParams>) {
    return useQuery({
        queryKey: computed(() => DEVICE_QUERY_KEYS.list(toValue(params) ?? {})),
        queryFn: () => DeviceApiService.getAll(toValue(params) ?? {}),
        // Page changes keep the previous rows visible instead of flashing an
        // empty table and collapsing the paginator.
        placeholderData: keepPreviousData,
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
