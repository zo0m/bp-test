import { registerErrorCodes } from '@core/shared/constants';

/**
 * Inspection error codes, registered at module load so that the shared
 * exception types accept them.
 */
export const INSPECTION_ERROR_CODES = {
    NOT_FOUND: 'INSPECTION_NOT_FOUND',
} as const;

registerErrorCodes(Object.values(INSPECTION_ERROR_CODES));
