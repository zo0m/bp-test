import type { ProductStatus } from './product.interface';

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    status?: ProductStatus;
    organization: string;
    sku: string;
    internalNotes?: string;
    barcode?: string;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    status?: ProductStatus;
    organization?: string;
    internalNotes?: string;
    barcode?: string;
}
