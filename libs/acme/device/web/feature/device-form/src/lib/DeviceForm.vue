<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { DEVICE_STATUSES } from '@acme/device/shared/device-types';
import type { CreateDeviceDto } from '@acme/device/shared/device-types';
import {
    DEVICE_STATUS_CONFIG,
    DEVICE_SERIAL_MAX_LENGTH,
} from '@acme/device/shared/device-constants';

defineOptions({ name: 'DeviceForm' });

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<CreateDeviceDto>;
        submitting?: boolean;
        mode?: 'create' | 'edit';
    }>(),
    { mode: 'create' },
);

const emit = defineEmits<{
    submit: [value: CreateDeviceDto];
    cancel: [];
}>();

const statusOptions = DEVICE_STATUSES.map((value) => ({
    value,
    label: DEVICE_STATUS_CONFIG[value].label,
}));

const form = ref<Partial<CreateDeviceDto>>({ ...props.modelValue });
const touched = ref<Record<string, boolean>>({});

const errors = computed(() => {
    const next: Record<string, string> = {};
    if (!form.value.serial) next.serial = 'Serial Number is required';
    if (String(form.value.serial ?? '').length > 64)
        next.serial = 'Serial Number must be 64 characters or less';
    if (!form.value.status) next.status = 'Status is required';
    return next;
});

const valid = computed(() => Object.keys(errors.value).length === 0);

function handleSubmit() {
    touched.value.serial = true;
    touched.value.status = true;
    if (!valid.value) return;
    emit('submit', form.value as CreateDeviceDto);
}
</script>

<template>
    <form class="device-form" @submit.prevent="handleSubmit">
        <div class="field">
            <label for="serial">Serial Number *</label>
            <InputText
                id="serial"
                v-model="form.serial"
                :maxlength="64"
                @blur="touched.serial = true"
            />
            <small v-if="touched.serial && errors.serial" class="error">{{ errors.serial }}</small>
        </div>
        <div class="field">
            <label for="status">Status *</label>
            <Select
                id="status"
                v-model="form.status"
                :options="statusOptions"
                option-label="label"
                option-value="value"
                @blur="touched.status = true"
            />
            <small v-if="touched.status && errors.status" class="error">{{ errors.status }}</small>
        </div>
        <div class="actions">
            <Button
                type="button"
                label="Cancel"
                severity="secondary"
                text
                @click="emit('cancel')"
            />
            <Button type="submit" label="Save" :loading="submitting" :disabled="!valid" />
        </div>
    </form>
</template>

<style scoped>
.device-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.error {
    color: var(--p-red-500);
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
</style>
