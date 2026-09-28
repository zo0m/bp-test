<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useReplaceDevice } from '@acme/device/web/device-api';

defineOptions({ name: 'DeviceReplace' });

const props = defineProps<{ deviceId: string }>();
const emit = defineEmits<{ done: [] }>();

const replace = useReplaceDevice();
const open = ref(false);
const input = ref<{
    replacement: string;
    reason: string;
}>({} as never);

async function run() {
    await replace.mutateAsync({ id: props.deviceId, data: input.value });
    open.value = false;
    emit('done');
}

function handleClick() {
    open.value = true;
}
</script>

<template>
    <Button
        label="Replace"
        severity="warn"
        :loading="replace.isPending.value"
        @click="handleClick"
    />
    <Dialog v-model:visible="open" modal header="Replace">
        <div class="field">
            <label for="replacement">Replacement Device</label>
            <InputText id="replacement" v-model="input.replacement" />
        </div>
        <div class="field">
            <label for="reason">Reason</label>
            <InputText id="reason" v-model="input.reason" />
        </div>
        <template #footer>
            <Button label="Cancel" severity="secondary" text @click="open = false" />
            <Button label="Replace" @click="run" />
        </template>
    </Dialog>
</template>
