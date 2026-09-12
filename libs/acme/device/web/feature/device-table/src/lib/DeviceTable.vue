<script setup lang="ts">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import type { Device } from '@acme/device/shared/device-types';
import { DeviceStatus } from '@acme/device/web/device-status';
import { formatDateShort } from '@core/shared/utils';

defineOptions({ name: 'DeviceTable' });

withDefaults(
    defineProps<{
        devices: Device[];
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
    select: [device: Device];
    edit: [device: Device];
    delete: [device: Device];
    deactivate: [device: Device];
    replace: [device: Device];
    move: [device: Device];
    generateQrCode: [device: Device];
    page: [event: DataTablePageEvent];
}>();

function handlePage(event: DataTablePageEvent) {
    emit('page', event);
}
</script>

<template>
    <DataTable
        :value="devices"
        :loading="loading"
        :paginator="totalRecords !== undefined"
        :rows="rows ?? 10"
        :total-records="totalRecords"
        :first="first ?? 0"
        :rows-per-page-options="rowsPerPageOptions"
        :lazy="totalRecords !== undefined"
        striped-rows
        responsive-layout="scroll"
        class="device-table"
        @page="handlePage"
    >
        <template #empty>
            <div class="empty-state">No Devices found.</div>
        </template>
        <Column field="serial" header="Serial Number" sortable />
        <Column field="status" header="Status">
            <template #body="{ data }">
                <DeviceStatus :status="data.status" />
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
                        label="Deactivate"
                        rounded
                        outlined
                        severity="danger"
                        aria-label="Deactivate"
                        @click="emit('deactivate', data)"
                    />
                    <Button
                        label="Replace"
                        rounded
                        outlined
                        severity="warn"
                        aria-label="Replace"
                        @click="emit('replace', data)"
                    />
                    <Button
                        label="Move"
                        rounded
                        outlined
                        aria-label="Move"
                        @click="emit('move', data)"
                    />
                    <Button
                        icon="pi pi-qr-code"
                        rounded
                        outlined
                        aria-label="Generate QR Code"
                        @click="emit('generateQrCode', data)"
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
.device-table {
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
