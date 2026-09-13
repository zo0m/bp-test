import { registerErrorCodes } from '@core/shared/constants';

/**
 * Product error codes, registered at module load so that the shared
 * exception types accept them.
 */
export const PRODUCT_ERROR_CODES = {
    NOT_FOUND: 'PRODUCT_NOT_FOUND',
} as const;

registerErrorCodes(Object.values(PRODUCT_ERROR_CODES));
