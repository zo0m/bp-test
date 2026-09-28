<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { useDeactivateDevice } from '@acme/device/web/device-api';

defineOptions({ name: 'DeviceDeactivate' });

const props = defineProps<{ deviceId: string }>();
const emit = defineEmits<{ done: [] }>();

const deactivate = useDeactivateDevice();
const confirm = useConfirm();

async function run() {
    await deactivate.mutateAsync(props.deviceId);
    emit('done');
}

function handleClick() {
    confirm.require({
        message: 'Are you sure you want to Deactivate this Device?',
        header: 'Deactivate',
        icon: 'pi pi-exclamation-triangle',
        accept: run,
    });
}
</script>

<template>
    <Button
        label="Deactivate"
        severity="danger"
        :loading="deactivate.isPending.value"
        @click="handleClick"
    />
    <ConfirmDialog />
</template>
