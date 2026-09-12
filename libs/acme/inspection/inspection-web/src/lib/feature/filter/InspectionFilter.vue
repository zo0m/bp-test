<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

defineOptions({ name: 'InspectionFilter' });

const emit = defineEmits<{ change: [filters: Record<string, unknown>] }>();

const filters = ref<{
    completedAt?: string;
    device?: string;
}>({});
watch(filters, (next) => emit('change', { ...next }), { deep: true });

function reset() {
    filters.value = {};
}
</script>

<template>
    <div class="inspection-filter">
        <div class="filter">
            <label for="filter-completedAt">Completed At</label>
            <InputText id="filter-completedAt" v-model="filters.completedAt" />
        </div>
        <div class="filter">
            <label for="filter-device">Device</label>
            <InputText id="filter-device" v-model="filters.device" />
        </div>
        <Button label="Reset" severity="secondary" text @click="reset" />
    </div>
</template>

<style scoped>
.inspection-filter {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    flex-wrap: wrap;
}

.filter {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>
