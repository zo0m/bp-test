import { useQuery } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { DEVICE_QUERY_KEYS } from '@acme/device/shared/device-constants';
import type { CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import type { PaginationParams } from '@core/shared/types';
import { DeviceApiService } from './DeviceApiService';

/** Generate QR Code — Produce a scannable asset label */
export function useDeviceGenerateQrCodeQuery(id: MaybeRef<string | undefined>) {
    return useQuery({
        queryKey: computed(() => [...DEVICE_QUERY_KEYS.details(), toValue(id), 'generate-qr-code']),
        queryFn: () => {
            const idValue = toValue(id);
            if (!idValue) {
                throw new Error('Device ID is required');
            }
            return DeviceApiService.generateQrCode(idValue);
        },
        enabled: computed(() => !!toValue(id)),
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
