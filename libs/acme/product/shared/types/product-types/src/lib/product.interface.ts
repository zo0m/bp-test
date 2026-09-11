export const PRODUCT_STATUSES = ['draft', 'active', 'archived', 'out_of_stock'] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    status: ProductStatus;
    organization: string;
    sku: string;
    internalNotes?: string;
    gtin?: string;
    /** ISO 8601 - dates cross the JSON boundary as strings */
    createdAt: string;
    updatedAt: string;
}
