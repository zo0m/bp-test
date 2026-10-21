export const PRODUCT_ROUTES = {
    CREATE: 'product.create',
    DETAILS: 'product.details',
    EDIT: 'product.edit',
    LIST: 'product.list',
} as const;

export type ProductRouteName = (typeof PRODUCT_ROUTES)[keyof typeof PRODUCT_ROUTES];
