<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { PageHeader } from '@core/web/ui';
import { parseApiError } from '@core/web/errors';
import { useInspectionQuery, inspectionRoutes } from '@acme/inspection/web/inspection-web';
import { formatDateShort } from '@core/shared/utils';

defineOptions({ name: 'InspectionDetailsPage' });

const route = useRoute();
const router = useRouter();
const id = computed(() => String(route.params.id));
const { data, isLoading, error } = useInspectionQuery(id);
</script>

<template>
    <div class="inspection-details-page">
        <PageHeader :title="data?.id ?? 'Inspection'">
            <template #actions> </template>
        </PageHeader>

        <ProgressSpinner v-if="isLoading" />
        <Message v-else-if="error" severity="error">
            {{ parseApiError(error).message }}
        </Message>
        <dl v-else-if="data">
            <dt>Completed At</dt>
            <dd>{{ data.completedAt === undefined ? '' : formatDateShort(data.completedAt) }}</dd>
        </dl>
    </div>
</template>

<style scoped>
.inspection-details-page {
    padding: 1.5rem;
}
</style>
