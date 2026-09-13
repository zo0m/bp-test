<script setup lang="ts">
defineOptions({ name: 'PageHeader' });

defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>

<template>
    <div class="page-header">
        <div class="page-header-content">
            <h1 class="page-title">{{ title }}</h1>
            <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
        </div>
        <div class="page-header-actions">
            <slot name="actions" />
        </div>
    </div>
</template>

<style scoped>
.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid var(--p-content-border-color, #e5e7eb);
    margin-bottom: 1.5rem;
}

.page-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.page-subtitle {
    margin: 0.25rem 0 0;
    color: var(--p-text-muted-color, #6b7280);
}

.page-header-actions {
    display: flex;
    gap: 0.5rem;
}
</style>
