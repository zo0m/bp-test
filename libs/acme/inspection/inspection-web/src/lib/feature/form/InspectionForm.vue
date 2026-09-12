<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import type { CreateInspectionDto } from '@acme/inspection/shared/inspection-shared';

defineOptions({ name: 'InspectionForm' });

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<CreateInspectionDto>;
        submitting?: boolean;
        mode?: 'create' | 'edit';
    }>(),
    { mode: 'create' },
);

const emit = defineEmits<{
    submit: [value: CreateInspectionDto];
    cancel: [];
}>();

const form = ref<Partial<CreateInspectionDto>>({ ...props.modelValue });
const touched = ref<Record<string, boolean>>({});

const errors = computed(() => {
    const next: Record<string, string> = {};
    return next;
});

const valid = computed(() => Object.keys(errors.value).length === 0);

function handleSubmit() {
    if (!valid.value) return;
    emit('submit', form.value as CreateInspectionDto);
}
</script>

<template>
    <form class="inspection-form" @submit.prevent="handleSubmit">
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
.inspection-form {
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
