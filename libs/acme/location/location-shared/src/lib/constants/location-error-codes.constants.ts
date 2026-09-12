import { registerErrorCodes } from '@core/shared/constants';

/**
 * Location error codes, registered at module load so that the shared
 * exception types accept them.
 */
export const LOCATION_ERROR_CODES = {
    NOT_FOUND: 'LOCATION_NOT_FOUND',
} as const;

registerErrorCodes(Object.values(LOCATION_ERROR_CODES));
