<script setup lang="ts">
import Tag from 'primevue/tag';
import { computed } from 'vue';
import type { ProductStatus } from '@acme/product/shared/product-types';
import { PRODUCT_STATUS_CONFIG } from '@acme/product/shared/product-constants';

defineOptions({ name: 'ProductStatus' });

const props = defineProps<{ status: ProductStatus }>();

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
        PRODUCT_STATUS_CONFIG[props.status] ?? {
            label: props.status,
            tone: 'neutral',
        },
);
</script>

<template>
    <Tag :value="config.label" :severity="SEVERITY[config.tone]" />
</template>
