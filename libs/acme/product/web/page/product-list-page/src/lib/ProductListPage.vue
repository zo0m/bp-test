<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { PageHeader } from '@core/web/ui';
import { ProductTableProvider } from '@acme/product/web/product-table-provider';
import { productRoutes } from '@acme/product/web/product-routes';
import type { Product } from '@acme/product/shared/product-types';

defineOptions({ name: 'ProductListPage' });

const router = useRouter();

function handleCreateClick() {
    router.push(productRoutes.create());
}

function handleSelect(product: Product) {
    router.push(productRoutes.details(product.id));
}

function handleEdit(product: Product) {
    router.push(productRoutes.edit(product.id));
}
</script>

<template>
    <div class="product-list-page">
        <PageHeader title="Products">
            <template #actions>
                <Button label="Create Product" icon="pi pi-plus" @click="handleCreateClick" />
            </template>
        </PageHeader>

        <ProductTableProvider @select="handleSelect" @edit="handleEdit" />
    </div>
</template>

<style scoped>
.product-list-page {
    padding: 1.5rem;
}
</style>
