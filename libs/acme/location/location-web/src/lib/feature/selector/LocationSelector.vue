<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';
import { useLocationsQuery } from '@acme/location/web/location-web';
import type { Location } from '@acme/location/shared/location-shared';

defineOptions({ name: 'LocationSelector' });

defineProps<{ modelValue?: string; disabled?: boolean }>();
defineEmits<{ 'update:modelValue': [value: string | undefined] }>();

const { data, isLoading } = useLocationsQuery();
const options = computed(() => data.value?.data ?? []);
</script>

<template>
    <Select
        :model-value="modelValue"
        :options="options"
        option-label="name"
        option-value="id"
        :loading="isLoading"
        :disabled="disabled"
        filter
        placeholder="Select a Location"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>
