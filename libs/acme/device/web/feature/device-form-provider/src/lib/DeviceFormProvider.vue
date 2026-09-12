<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { DeviceForm } from '@acme/device/web/device-form';
import { useCreateDevice, useDeviceQuery, useUpdateDevice } from '@acme/device/web/device-api';
import type { Device, CreateDeviceDto } from '@acme/device/shared/device-types';
import { parseApiError } from '@core/web/errors';

defineOptions({ name: 'DeviceFormProvider' });

const props = defineProps<{ deviceId?: string }>();
const emit = defineEmits<{ saved: [device: Device]; cancel: [] }>();

const mode = computed(() => (props.deviceId ? 'edit' : 'create'));
const { data, isLoading, error: loadError } = useDeviceQuery(computed(() => props.deviceId));
const createDevice = useCreateDevice();
const updateDevice = useUpdateDevice();

const submitError = ref<string | undefined>();
const model = ref<Partial<CreateDeviceDto>>({});
watch(
    data,
    (next) => {
        if (next) model.value = { ...next };
    },
    { immediate: true },
);

async function handleSubmit(value: CreateDeviceDto) {
    submitError.value = undefined;
    try {
        const saved = props.deviceId
            ? await updateDevice.mutateAsync({ id: props.deviceId, data: value })
            : await createDevice.mutateAsync(value);
        emit('saved', saved);
    } catch (cause) {
        submitError.value = parseApiError(cause).message;
    }
}
</script>

<template>
    <ProgressSpinner v-if="isLoading" />
    <Message v-else-if="loadError" severity="error">Could not load this Device.</Message>
    <template v-else>
        <Message v-if="submitError" severity="error">{{ submitError }}</Message>
        <DeviceForm
            :model-value="model"
            :mode="mode"
            :submitting="createDevice.isPending.value || updateDevice.isPending.value"
            @submit="handleSubmit"
            @cancel="emit('cancel')"
        />
    </template>
</template>
