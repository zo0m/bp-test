<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';
import { useOrganizationsQuery } from '@acme/organization/web/organization-web';
import type { Organization } from '@acme/organization/shared/organization-shared';

defineOptions({ name: 'OrganizationSelector' });

defineProps<{ modelValue?: string; disabled?: boolean }>();
defineEmits<{ 'update:modelValue': [value: string | undefined] }>();

const { data, isLoading } = useOrganizationsQuery();
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
        placeholder="Select a Organization"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>
