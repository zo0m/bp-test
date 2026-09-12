<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useMoveDevice } from '@acme/device/web/device-api';

defineOptions({ name: 'DeviceMove' });

const props = defineProps<{ deviceId: string }>();
const emit = defineEmits<{ done: [] }>();

const move = useMoveDevice();
const open = ref(false);
const input = ref<{
    destination: string;
}>({} as never);

async function run() {
    await move.mutateAsync({ id: props.deviceId, data: input.value });
    open.value = false;
    emit('done');
}

function handleClick() {
    open.value = true;
}
</script>

<template>
    <Button label="Move" :loading="move.isPending.value" @click="handleClick" />
    <Dialog v-model:visible="open" modal header="Move">
        <div class="field">
            <label for="destination">Destination</label>
            <InputText id="destination" v-model="input.destination" />
        </div>
        <template #footer>
            <Button label="Cancel" severity="secondary" text @click="open = false" />
            <Button label="Move" @click="run" />
        </template>
    </Dialog>
</template>
