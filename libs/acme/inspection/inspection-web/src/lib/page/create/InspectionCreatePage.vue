<script setup lang="ts">
import { useRouter } from 'vue-router';
import { PageHeader } from '@core/web/ui';
import { InspectionFormProvider, inspectionRoutes } from '@acme/inspection/web/inspection-web';

defineOptions({ name: 'InspectionCreatePage' });

const router = useRouter();

function handleSaved(inspection: { id: string }) {
    router.push(inspectionRoutes.details(inspection.id));
}
</script>

<template>
    <div class="inspection-create-page">
        <PageHeader title="Create Inspection" />
        <InspectionFormProvider
            @saved="handleSaved"
            @cancel="router.push(inspectionRoutes.list())"
        />
    </div>
</template>

<style scoped>
.inspection-create-page {
    padding: 1.5rem;
}
</style>
