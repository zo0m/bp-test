export const PRODUCT_PERMISSIONS = {
    READ: 'product.read',
    CREATE: 'product.write',
    UPDATE: 'product.write',
    DELETE: 'product.delete',
} as const;

export type ProductPermission = (typeof PRODUCT_PERMISSIONS)[keyof typeof PRODUCT_PERMISSIONS];
