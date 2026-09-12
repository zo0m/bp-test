<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';
import { useDevicesQuery } from '@acme/device/web/device-api';
import type { Device } from '@acme/device/shared/device-types';

defineOptions({ name: 'DeviceSelector' });

defineProps<{ modelValue?: string; disabled?: boolean }>();
defineEmits<{ 'update:modelValue': [value: string | undefined] }>();

const { data, isLoading } = useDevicesQuery();
const options = computed(() => data.value?.data ?? []);
</script>

<template>
    <Select
        :model-value="modelValue"
        :options="options"
        option-label="serial"
        option-value="id"
        :loading="isLoading"
        :disabled="disabled"
        filter
        placeholder="Select a Device"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>
