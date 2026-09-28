import { registerErrorCodes } from '@core/shared/constants';

/**
 * Device error codes, registered at module load so that the shared
 * exception types accept them.
 */
export const DEVICE_ERROR_CODES = {
    NOT_FOUND: 'DEVICE_NOT_FOUND',
} as const;

registerErrorCodes(Object.values(DEVICE_ERROR_CODES));
