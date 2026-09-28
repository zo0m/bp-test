<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';
import { useInspectionsQuery } from '@acme/inspection/web/inspection-web';
import type { Inspection } from '@acme/inspection/shared/inspection-shared';

defineOptions({ name: 'InspectionSelector' });

defineProps<{ modelValue?: string; disabled?: boolean }>();
defineEmits<{ 'update:modelValue': [value: string | undefined] }>();

const { data, isLoading } = useInspectionsQuery();
const options = computed(() => data.value?.data ?? []);
</script>

<template>
    <Select
        :model-value="modelValue"
        :options="options"
        option-label="id"
        option-value="id"
        :loading="isLoading"
        :disabled="disabled"
        filter
        placeholder="Select a Inspection"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>
