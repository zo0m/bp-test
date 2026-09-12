import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { DEVICE_QUERY_KEYS } from '@acme/device/shared/device-constants';
import type { CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import type { PaginationParams } from '@core/shared/types';
import { DeviceApiService } from './DeviceApiService';

/** Deactivate — Take the device out of service */
export function useDeactivateDevice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeviceApiService.deactivate(id),
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: DEVICE_QUERY_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: DEVICE_QUERY_KEYS.detail(id) });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
