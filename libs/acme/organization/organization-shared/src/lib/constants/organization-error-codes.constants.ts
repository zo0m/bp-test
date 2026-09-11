import { registerErrorCodes } from '@core/shared/constants';

/**
 * Organization error codes, registered at module load so that the shared
 * exception types accept them.
 */
export const ORGANIZATION_ERROR_CODES = {
    NOT_FOUND: 'ORGANIZATION_NOT_FOUND',
} as const;

registerErrorCodes(Object.values(ORGANIZATION_ERROR_CODES));
