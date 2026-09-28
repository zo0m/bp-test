<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { PageHeader } from '@core/web/ui';
import { DeviceTableProvider } from '@acme/device/web/device-table-provider';
import { deviceRoutes } from '@acme/device/web/device-routes';
import type { Device } from '@acme/device/shared/device-types';

defineOptions({ name: 'DeviceListPage' });

const router = useRouter();

function handleCreateClick() {
    router.push(deviceRoutes.create());
}

function handleSelect(device: Device) {
    router.push(deviceRoutes.details(device.id));
}

function handleEdit(device: Device) {
    router.push(deviceRoutes.edit(device.id));
}
</script>

<template>
    <div class="device-list-page">
        <PageHeader title="Devices">
            <template #actions>
                <Button label="Create Device" icon="pi pi-plus" @click="handleCreateClick" />
            </template>
        </PageHeader>

        <DeviceTableProvider @select="handleSelect" @edit="handleEdit" />
    </div>
</template>

<style scoped>
.device-list-page {
    padding: 1.5rem;
}
</style>
