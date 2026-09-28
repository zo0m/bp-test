<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import {
    InspectionForm,
    useCreateInspection,
    useInspectionQuery,
} from '@acme/inspection/web/inspection-web';
import type { Inspection, CreateInspectionDto } from '@acme/inspection/shared/inspection-shared';
import { parseApiError } from '@core/web/errors';

defineOptions({ name: 'InspectionFormProvider' });

const props = defineProps<{ inspectionId?: string }>();
const emit = defineEmits<{ saved: [inspection: Inspection]; cancel: [] }>();

const mode = computed(() => (props.inspectionId ? 'edit' : 'create'));
const {
    data,
    isLoading,
    error: loadError,
} = useInspectionQuery(computed(() => props.inspectionId));
const createInspection = useCreateInspection();

const submitError = ref<string | undefined>();
const model = ref<Partial<CreateInspectionDto>>({});
watch(
    data,
    (next) => {
        if (next) model.value = { ...next };
    },
    { immediate: true },
);

async function handleSubmit(value: CreateInspectionDto) {
    submitError.value = undefined;
    try {
        const saved = await createInspection.mutateAsync(value);
        emit('saved', saved);
    } catch (cause) {
        submitError.value = parseApiError(cause).message;
    }
}
</script>

<template>
    <ProgressSpinner v-if="isLoading" />
    <Message v-else-if="loadError" severity="error">Could not load this Inspection.</Message>
    <template v-else>
        <Message v-if="submitError" severity="error">{{ submitError }}</Message>
        <InspectionForm
            :model-value="model"
            :mode="mode"
            :submitting="createInspection.isPending.value"
            @submit="handleSubmit"
            @cancel="emit('cancel')"
        />
    </template>
</template>
