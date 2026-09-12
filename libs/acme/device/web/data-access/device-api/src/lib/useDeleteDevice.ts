import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { DEVICE_QUERY_KEYS } from '@acme/device/shared/device-constants';
import type { CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import type { PaginationParams } from '@core/shared/types';
import { DeviceApiService } from './DeviceApiService';

export function useDeleteDevice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeviceApiService.delete(id),
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: DEVICE_QUERY_KEYS.lists() });
            // Drop (not just invalidate) the detail entry: a back-button or
            // bookmark visit must refetch and 404, not render the cached entity.
            queryClient.removeQueries({ queryKey: DEVICE_QUERY_KEYS.detail(id) });
        },
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
