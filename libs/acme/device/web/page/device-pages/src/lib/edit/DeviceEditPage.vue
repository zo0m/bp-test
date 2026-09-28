<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PageHeader } from '@core/web/ui';
import { DeviceFormProvider } from '@acme/device/web/device-form-provider';
import { deviceRoutes } from '@acme/device/web/device-routes';

defineOptions({ name: 'DeviceEditPage' });

const route = useRoute();
const router = useRouter();
const id = computed(() => String(route.params.id));

function handleSaved() {
    router.push(deviceRoutes.details(id.value));
}
</script>

<template>
    <div class="device-edit-page">
        <PageHeader title="Edit Device" />
        <DeviceFormProvider
            :device-id="id"
            @saved="handleSaved"
            @cancel="router.push(deviceRoutes.details(id))"
        />
    </div>
</template>

<style scoped>
.device-edit-page {
    padding: 1.5rem;
}
</style>
