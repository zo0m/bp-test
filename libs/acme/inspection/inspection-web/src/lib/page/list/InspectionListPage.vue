<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { PageHeader } from '@core/web/ui';
import { InspectionTableProvider, inspectionRoutes } from '@acme/inspection/web/inspection-web';
import type { Inspection } from '@acme/inspection/shared/inspection-shared';

defineOptions({ name: 'InspectionListPage' });

const router = useRouter();

function handleCreateClick() {
    router.push(inspectionRoutes.create());
}

function handleSelect(inspection: Inspection) {
    router.push(inspectionRoutes.details(inspection.id));
}
</script>

<template>
    <div class="inspection-list-page">
        <PageHeader title="Inspections">
            <template #actions>
                <Button label="Create Inspection" icon="pi pi-plus" @click="handleCreateClick" />
            </template>
        </PageHeader>

        <InspectionTableProvider @select="handleSelect" />
    </div>
</template>

<style scoped>
.inspection-list-page {
    padding: 1.5rem;
}
</style>
