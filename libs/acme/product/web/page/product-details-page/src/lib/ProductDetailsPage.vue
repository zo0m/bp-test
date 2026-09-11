<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { PageHeader } from '@core/web/ui';
import { parseApiError } from '@core/web/errors';
import { useProductQuery } from '@acme/product/web/product-api';
import { productRoutes } from '@acme/product/web/product-routes';
import { formatCurrency } from '@core/shared/utils';

defineOptions({ name: 'ProductDetailsPage' });

const route = useRoute();
const router = useRouter();
const id = computed(() => String(route.params.id));
const { data, isLoading, error } = useProductQuery(id);
</script>

<template>
    <div class="product-details-page">
        <PageHeader :title="data?.name ?? 'Product'">
            <template #actions>
                <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    @click="router.push(productRoutes.edit(id))"
                />
            </template>
        </PageHeader>

        <ProgressSpinner v-if="isLoading" />
        <Message v-else-if="error" severity="error">
            {{ parseApiError(error).message }}
        </Message>
        <dl v-else-if="data">
            <dt>Name</dt>
            <dd>{{ data.name }}</dd>
            <dt>Description</dt>
            <dd>{{ data.description }}</dd>
            <dt>Price</dt>
            <dd>{{ data.price === undefined ? '' : formatCurrency(data.price) }}</dd>
            <dt>Status</dt>
            <dd>{{ data.status }}</dd>
            <dt>Organization</dt>
            <dd>{{ data.organization }}</dd>
            <dt>SKU</dt>
            <dd>{{ data.sku }}</dd>
            <dt>Barcode</dt>
            <dd>{{ data.barcode }}</dd>
        </dl>
    </div>
</template>

<style scoped>
.product-details-page {
    padding: 1.5rem;
}
</style>
