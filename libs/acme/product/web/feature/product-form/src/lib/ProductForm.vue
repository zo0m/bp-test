<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { PRODUCT_STATUSES } from '@acme/product/shared/product-types';
import type { CreateProductDto } from '@acme/product/shared/product-types';
import {
    PRODUCT_STATUS_CONFIG,
    PRODUCT_NAME_MAX_LENGTH,
    PRODUCT_DESCRIPTION_MAX_LENGTH,
    PRODUCT_PRICE_MIN,
    PRODUCT_PRICE_MAX,
} from '@acme/product/shared/product-constants';
import { OrganizationSelector } from '@acme/organization/web/organization-web';

defineOptions({ name: 'ProductForm' });

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<CreateProductDto>;
        submitting?: boolean;
        mode?: 'create' | 'edit';
    }>(),
    { mode: 'create' },
);

const emit = defineEmits<{
    submit: [value: CreateProductDto];
    cancel: [];
}>();

const statusOptions = PRODUCT_STATUSES.map((value) => ({
    value,
    label: PRODUCT_STATUS_CONFIG[value].label,
}));

const form = ref<Partial<CreateProductDto>>({ ...props.modelValue });
const touched = ref<Record<string, boolean>>({});

const errors = computed(() => {
    const next: Record<string, string> = {};
    if (!form.value.name) next.name = 'Name is required';
    if (String(form.value.name ?? '').length > 255)
        next.name = 'Name must be 255 characters or less';
    if (!form.value.description) next.description = 'Description is required';
    if (String(form.value.description ?? '').length > 5000)
        next.description = 'Description must be 5000 characters or less';
    if (!form.value.price) next.price = 'Price is required';
    if (Number(form.value.price ?? 0) < 0) next.price = 'Price must be 0 or greater';
    if (Number(form.value.price ?? 0) > 99999999.99) next.price = 'Price exceeds maximum value';
    if (!form.value.status) next.status = 'Status is required';
    if (!form.value.organization) next.organization = 'Organization is required';
    return next;
});

const valid = computed(() => Object.keys(errors.value).length === 0);

function handleSubmit() {
    touched.value.name = true;
    touched.value.description = true;
    touched.value.price = true;
    touched.value.status = true;
    touched.value.organization = true;
    touched.value.sku = true;
    if (!valid.value) return;
    emit('submit', form.value as CreateProductDto);
}
</script>

<template>
    <form class="product-form" @submit.prevent="handleSubmit">
        <div class="field">
            <label for="name">Name *</label>
            <InputText id="name" v-model="form.name" :maxlength="255" @blur="touched.name = true" />
            <small v-if="touched.name && errors.name" class="error">{{ errors.name }}</small>
        </div>
        <div class="field">
            <label for="description">Description *</label>
            <Textarea
                id="description"
                v-model="form.description"
                rows="4"
                :maxlength="5000"
                @blur="touched.description = true"
            />
            <small v-if="touched.description && errors.description" class="error">{{
                errors.description
            }}</small>
        </div>
        <div class="field">
            <label for="price">Price *</label>
            <InputNumber
                id="price"
                v-model="form.price"
                mode="currency"
                currency="USD"
                :min="0"
                :max="99999999.99"
                :step="0.01"
                @blur="touched.price = true"
            />
            <small v-if="touched.price && errors.price" class="error">{{ errors.price }}</small>
        </div>
        <div class="field">
            <label for="status">Status *</label>
            <Select
                id="status"
                v-model="form.status"
                :options="statusOptions"
                option-label="label"
                option-value="value"
                @blur="touched.status = true"
            />
            <small v-if="touched.status && errors.status" class="error">{{ errors.status }}</small>
        </div>
        <div class="field">
            <label for="organization">Organization *</label>
            <OrganizationSelector
                id="organization"
                v-model="form.organization"
                @blur="touched.organization = true"
            />
            <small v-if="touched.organization && errors.organization" class="error">{{
                errors.organization
            }}</small>
        </div>
        <div class="field">
            <label for="sku">SKU</label>
            <InputText id="sku" v-model="form.sku" @blur="touched.sku = true" />
            <small v-if="touched.sku && errors.sku" class="error">{{ errors.sku }}</small>
        </div>
        <div class="actions">
            <Button
                type="button"
                label="Cancel"
                severity="secondary"
                text
                @click="emit('cancel')"
            />
            <Button type="submit" label="Save" :loading="submitting" :disabled="!valid" />
        </div>
    </form>
</template>

<style scoped>
.product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.error {
    color: var(--p-red-500);
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
</style>
