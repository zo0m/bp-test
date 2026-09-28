<script setup lang="ts">
import { useRouter } from 'vue-router';
import { PageHeader } from '@core/web/ui';
import { DeviceFormProvider } from '@acme/device/web/device-form-provider';
import { deviceRoutes } from '@acme/device/web/device-routes';

defineOptions({ name: 'DeviceCreatePage' });

const router = useRouter();

function handleSaved(device: { id: string }) {
    router.push(deviceRoutes.details(device.id));
}
</script>

<template>
    <div class="device-create-page">
        <PageHeader title="Create Device" />
        <DeviceFormProvider @saved="handleSaved" @cancel="router.push(deviceRoutes.list())" />
    </div>
</template>

<style scoped>
.device-create-page {
    padding: 1.5rem;
}
</style>
