<script setup lang="ts">
import { useRouter } from 'vue-router';
import { PageHeader } from '@core/web/ui';
import { ProductFormProvider } from '@acme/product/web/product-form-provider';
import { productRoutes } from '@acme/product/web/product-routes';

defineOptions({ name: 'ProductCreatePage' });

const router = useRouter();

function handleSaved(product: { id: string }) {
    router.push(productRoutes.details(product.id));
}
</script>

<template>
    <div class="product-create-page">
        <PageHeader title="Create Product" />
        <ProductFormProvider @saved="handleSaved" @cancel="router.push(productRoutes.list())" />
    </div>
</template>

<style scoped>
.product-create-page {
    padding: 1.5rem;
}
</style>
