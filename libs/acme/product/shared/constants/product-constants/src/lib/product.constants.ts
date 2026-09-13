import type { ProductStatus } from '@acme/product/shared/product-types';

export const PRODUCT_NAME_MAX_LENGTH = 255;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 5000;
export const PRODUCT_PRICE_MIN = 0;
export const PRODUCT_PRICE_MAX = 99999999.99;
export const PRODUCT_SKU_MAX_LENGTH = 64;
export const PRODUCT_INTERNAL_NOTES_MAX_LENGTH = 2000;

export const PRODUCT_API_PATH = '/products';

export const PRODUCT_QUERY_KEYS = {
    all: ['products'] as const,
    lists: () => [...PRODUCT_QUERY_KEYS.all, 'list'] as const,
    list: (params: object) => [...PRODUCT_QUERY_KEYS.lists(), params] as const,
    details: () => [...PRODUCT_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...PRODUCT_QUERY_KEYS.details(), id] as const,
} as const;

/**
 * Display metadata for ProductStatus. `tone` is the
 * model's neutral vocabulary; the component maps it onto its own scale.
 */
export const PRODUCT_STATUS_CONFIG = {
    draft: { label: 'Draft', tone: 'neutral' },
    active: { label: 'Active', tone: 'success' },
    archived: { label: 'Archived', tone: 'warning' },
    out_of_stock: { label: 'Out of Stock', tone: 'danger' },
} as const satisfies Record<ProductStatus, { label: string; tone: string }>;
export const PRODUCT_DEFAULT_STATUS: ProductStatus = 'draft';
