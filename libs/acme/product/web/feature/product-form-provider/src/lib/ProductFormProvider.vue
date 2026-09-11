<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { ProductForm } from '@acme/product/web/product-form';
import { useCreateProduct, useProductQuery, useUpdateProduct } from '@acme/product/web/product-api';
import type { Product, CreateProductDto } from '@acme/product/shared/product-types';
import { parseApiError } from '@core/web/errors';

defineOptions({ name: 'ProductFormProvider' });

const props = defineProps<{ productId?: string }>();
const emit = defineEmits<{ saved: [product: Product]; cancel: [] }>();

const mode = computed(() => (props.productId ? 'edit' : 'create'));
const { data, isLoading, error: loadError } = useProductQuery(computed(() => props.productId));
const createProduct = useCreateProduct();
const updateProduct = useUpdateProduct();

const submitError = ref<string | undefined>();
const model = ref<Partial<CreateProductDto>>({});
watch(
    data,
    (next) => {
        if (next) model.value = { ...next };
    },
    { immediate: true },
);

async function handleSubmit(value: CreateProductDto) {
    submitError.value = undefined;
    try {
        const saved = props.productId
            ? await updateProduct.mutateAsync({ id: props.productId, data: value })
            : await createProduct.mutateAsync(value);
        emit('saved', saved);
    } catch (cause) {
        submitError.value = parseApiError(cause).message;
    }
}
</script>

<template>
    <ProgressSpinner v-if="isLoading" />
    <Message v-else-if="loadError" severity="error">Could not load this Product.</Message>
    <template v-else>
        <Message v-if="submitError" severity="error">{{ submitError }}</Message>
        <ProductForm
            :model-value="model"
            :mode="mode"
            :submitting="createProduct.isPending.value || updateProduct.isPending.value"
            @submit="handleSubmit"
            @cancel="emit('cancel')"
        />
    </template>
</template>
