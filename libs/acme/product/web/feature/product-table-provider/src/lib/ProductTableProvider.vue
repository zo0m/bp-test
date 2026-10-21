<script setup lang="ts">
import { computed, ref } from 'vue';
import Message from 'primevue/message';
import type { DataTablePageEvent } from 'primevue/datatable';
import { ProductTable } from '@acme/product/web/product-table';
import { useProductsQuery } from '@acme/product/web/product-api';
import type { Product } from '@acme/product/shared/product-types';
import { parseApiError } from '@core/web/errors';

defineOptions({ name: 'ProductTableProvider' });

const emit = defineEmits<{
    select: [product: Product];
    edit: [product: Product];
}>();

const page = ref(1);
const pageSize = ref(10);
const params = computed(() => ({ page: page.value, pageSize: pageSize.value }));
const { data, isFetching, error } = useProductsQuery(params);

const rows = computed(() => data.value?.data ?? []);
const total = computed(() => data.value?.total ?? 0);
const first = computed(() => (page.value - 1) * pageSize.value);

function handlePage(event: DataTablePageEvent) {
    page.value = event.page + 1;
    pageSize.value = event.rows;
}
</script>

<template>
    <Message v-if="error" severity="error">{{ parseApiError(error).message }}</Message>
    <ProductTable
        :products="rows"
        :loading="isFetching"
        :total-records="total"
        :rows="pageSize"
        :first="first"
        @page="handlePage"
        @select="emit('select', $event)"
        @edit="emit('edit', $event)"
    />
</template>
