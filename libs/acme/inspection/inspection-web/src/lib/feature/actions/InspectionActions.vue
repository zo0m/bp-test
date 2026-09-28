<script setup lang="ts">
import Button from 'primevue/button';
import type { Inspection } from '@acme/inspection/shared/inspection-shared';

defineOptions({ name: 'InspectionActions' });

defineProps<{ inspection: Inspection }>();
const emit = defineEmits<{}>();
</script>

<template>
    <div class="inspection-actions"></div>
</template>

<style scoped>
.inspection-actions {
    display: flex;
    gap: 0.5rem;
}
</style>
