<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { PageHeader } from '@core/web/ui';
import { parseApiError } from '@core/web/errors';
import { useDeviceQuery } from '@acme/device/web/device-api';
import { deviceRoutes } from '@acme/device/web/device-routes';

defineOptions({ name: 'DeviceDetailsPage' });

const route = useRoute();
const router = useRouter();
const id = computed(() => String(route.params.id));
const { data, isLoading, error } = useDeviceQuery(id);
</script>

<template>
    <div class="device-details-page">
        <PageHeader :title="data?.serial ?? 'Device'">
            <template #actions>
                <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    @click="router.push(deviceRoutes.edit(id))"
                />
            </template>
        </PageHeader>

        <ProgressSpinner v-if="isLoading" />
        <Message v-else-if="error" severity="error">
            {{ parseApiError(error).message }}
        </Message>
        <dl v-else-if="data">
            <dt>Serial Number</dt>
            <dd>{{ data.serial }}</dd>
            <dt>Status</dt>
            <dd>{{ data.status }}</dd>
            <dt>Inspection History</dt>
            <dd>{{ data.inspections }}</dd>
        </dl>
    </div>
</template>

<style scoped>
.device-details-page {
    padding: 1.5rem;
}
</style>
