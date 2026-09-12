<script setup lang="ts">
import Tag from 'primevue/tag';
import { computed } from 'vue';
import type { DeviceStatus } from '@acme/device/shared/device-types';
import { DEVICE_STATUS_CONFIG } from '@acme/device/shared/device-constants';

defineOptions({ name: 'DeviceStatus' });

const props = defineProps<{ status: DeviceStatus }>();

/** `tone` is the model's neutral vocabulary; PrimeVue's scale is this map. */
const SEVERITY: Record<string, string> = {
    neutral: 'secondary',
    info: 'info',
    success: 'success',
    warning: 'warn',
    danger: 'danger',
};

// The API may ship values this build does not know yet; render them as a
// neutral tag instead of throwing during render.
const config = computed(
    () =>
        DEVICE_STATUS_CONFIG[props.status] ?? {
            label: props.status,
            tone: 'neutral',
        },
);
</script>

<template>
    <Tag :value="config.label" :severity="SEVERITY[config.tone]" />
</template>
