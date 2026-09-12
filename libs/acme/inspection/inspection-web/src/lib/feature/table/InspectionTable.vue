<script setup lang="ts">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import type { Inspection } from '@acme/inspection/shared/inspection-shared';
import { formatDateShort } from '@core/shared/utils';

defineOptions({ name: 'InspectionTable' });

withDefaults(
    defineProps<{
        inspections: Inspection[];
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
    select: [inspection: Inspection];
    edit: [inspection: Inspection];
    delete: [inspection: Inspection];
    page: [event: DataTablePageEvent];
}>();

function handlePage(event: DataTablePageEvent) {
    emit('page', event);
}
</script>

<template>
    <DataTable
        :value="inspections"
        :loading="loading"
        :paginator="totalRecords !== undefined"
        :rows="rows ?? 10"
        :total-records="totalRecords"
        :first="first ?? 0"
        :rows-per-page-options="rowsPerPageOptions"
        :lazy="totalRecords !== undefined"
        striped-rows
        responsive-layout="scroll"
        class="inspection-table"
        @page="handlePage"
    >
        <template #empty>
            <div class="empty-state">No Inspections found.</div>
        </template>
        <Column field="completedAt" header="Completed At" sortable>
            <template #body="{ data }">
                {{ formatDateShort(data.completedAt) }}
            </template>
        </Column>
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
.inspection-table {
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
