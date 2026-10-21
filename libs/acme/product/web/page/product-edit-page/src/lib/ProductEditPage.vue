<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PageHeader } from '@core/web/ui';
import { ProductFormProvider } from '@acme/product/web/product-form-provider';
import { productRoutes } from '@acme/product/web/product-routes';

defineOptions({ name: 'ProductEditPage' });

const route = useRoute();
const router = useRouter();
const id = computed(() => String(route.params.id));

function handleSaved() {
    router.push(productRoutes.details(id.value));
}
</script>

<template>
    <div class="product-edit-page">
        <PageHeader title="Edit Product" />
        <ProductFormProvider
            :product-id="id"
            @saved="handleSaved"
            @cancel="router.push(productRoutes.details(id))"
        />
    </div>
</template>

<style scoped>
.product-edit-page {
    padding: 1.5rem;
}
</style>
