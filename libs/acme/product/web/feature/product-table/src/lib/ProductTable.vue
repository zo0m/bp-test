<script setup lang="ts">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import type { Product } from '@acme/product/shared/product-types';
import { ProductStatus } from '@acme/product/web/product-status';
import { OrganizationLink } from '@acme/organization/web/organization-web';
import { formatCurrency, formatDateShort } from '@core/shared/utils';

defineOptions({ name: 'ProductTable' });

withDefaults(
    defineProps<{
        products: Product[];
        loading?: boolean;
        totalRecords?: number;
        rows?: number;
        first?: number;
        rowsPerPageOptions?: number[];
    }>(),
    {
        rowsPerPageOptions: () => [5, 10, 25, 50],
    },
);

const emit = defineEmits<{
    select: [product: Product];
    edit: [product: Product];
    delete: [product: Product];
    page: [event: DataTablePageEvent];
}>();

function handlePage(event: DataTablePageEvent) {
    emit('page', event);
}
</script>

<template>
    <DataTable
        :value="products"
        :loading="loading"
        :paginator="totalRecords !== undefined"
        :rows="rows ?? 10"
        :total-records="totalRecords"
        :first="first ?? 0"
        :rows-per-page-options="rowsPerPageOptions"
        :lazy="totalRecords !== undefined"
        striped-rows
        responsive-layout="scroll"
        class="product-table"
        @page="handlePage"
    >
        <template #empty>
            <div class="empty-state">No Products found.</div>
        </template>
        <Column field="name" header="Name" sortable />
        <Column field="description" header="Description" />
        <Column field="price" header="Price" sortable>
            <template #body="{ data }">
                {{ formatCurrency(data.price) }}
            </template>
        </Column>
        <Column field="status" header="Status">
            <template #body="{ data }">
                <ProductStatus :status="data.status" />
            </template>
        </Column>
        <Column field="organization" header="Organization">
            <template #body="{ data }">
                <OrganizationLink :organization="data.organization" />
            </template>
        </Column>
        <Column field="sku" header="SKU" />
        <Column field="createdAt" header="Created" sortable>
            <template #body="{ data }">{{ formatDateShort(data.createdAt) }}</template>
        </Column>
        <Column header="Actions" :exportable="false" style="min-width: 10rem">
            <template #body="{ data }">
                <div class="actions">
                    <Button
                        icon="pi pi-eye"
                        rounded
                        outlined
                        severity="secondary"
                        aria-label="View"
                        @click="emit('select', data)"
                    />
                    <Button
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        severity="info"
                        aria-label="Edit"
                        @click="emit('edit', data)"
                    />
                    <Button
                        icon="pi pi-trash"
                        rounded
                        outlined
                        severity="danger"
                        aria-label="Delete"
                        @click="emit('delete', data)"
                    />
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<style scoped>
.product-table {
    width: 100%;
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: var(--p-text-muted-color);
}

.actions {
    display: flex;
    gap: 0.5rem;
}
</style>
