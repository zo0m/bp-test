import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { DEVICE_QUERY_KEYS } from '@acme/device/shared/device-constants';
import type { CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import type { PaginationParams } from '@core/shared/types';
import { DeviceApiService } from './DeviceApiService';

export function useCreateDevice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateDeviceDto) => DeviceApiService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DEVICE_QUERY_KEYS.lists() });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
