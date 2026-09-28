<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import { useDeviceGenerateQrCodeQuery } from '@acme/device/web/device-api';

defineOptions({ name: 'DeviceGenerateQrCode' });

const props = defineProps<{ deviceId: string }>();
const emit = defineEmits<{ done: [] }>();

const generateQrCode = useDeviceGenerateQrCodeQuery(computed(() => props.deviceId));

async function run() {
    await generateQrCode.refetch();
    emit('done');
}

function handleClick() {
    void run();
}
</script>

<template>
    <Button
        label="Generate QR Code"
        icon="pi pi-qr-code"
        :loading="generateQrCode.isFetching.value"
        @click="handleClick"
    />
</template>
