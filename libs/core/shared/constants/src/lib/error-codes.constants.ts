import type { CoreErrorCode, ErrorCode } from '@core/shared/types';

export type { CoreErrorCode, ErrorCode } from '@core/shared/types';

export const ERROR_CODES = {
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    BAD_REQUEST: 'BAD_REQUEST',
    UNPROCESSABLE: 'UNPROCESSABLE',
    RATE_LIMITED: 'RATE_LIMITED',
    NETWORK_ERROR: 'NETWORK_ERROR',
} as const satisfies Record<string, CoreErrorCode>;

const HTTP_STATUS_TO_ERROR_CODE: Record<number, ErrorCode> = {
    400: ERROR_CODES.BAD_REQUEST,
    401: ERROR_CODES.UNAUTHORIZED,
    403: ERROR_CODES.FORBIDDEN,
    404: ERROR_CODES.NOT_FOUND,
    408: ERROR_CODES.SERVICE_UNAVAILABLE,
    409: ERROR_CODES.CONFLICT,
    422: ERROR_CODES.UNPROCESSABLE,
    429: ERROR_CODES.RATE_LIMITED,
    500: ERROR_CODES.INTERNAL_ERROR,
    502: ERROR_CODES.SERVICE_UNAVAILABLE,
    503: ERROR_CODES.SERVICE_UNAVAILABLE,
    504: ERROR_CODES.SERVICE_UNAVAILABLE,
};

export function httpStatusToErrorCode(status: number): ErrorCode {
    return HTTP_STATUS_TO_ERROR_CODE[status] ?? ERROR_CODES.INTERNAL_ERROR;
}

/** SCREAMING_SNAKE_CASE, 3-64 characters. Rejects control characters by construction. */
export const ERROR_CODE_FORMAT = /^[A-Z][A-Z0-9_]{2,63}$/;

export function isErrorCodeFormat(code: string): boolean {
    return ERROR_CODE_FORMAT.test(code);
}

const registeredErrorCodes = new Set<string>(Object.values(ERROR_CODES));

/**
 * Register a domain's error codes so the rest of the application accepts them.
 *
 * Called at module load from the domain's shared constants, next to the
 * definitions. Registering the same code twice does nothing. The whole batch is
 * validated before any of it is added, so a bad code leaves the registry as it
 * was rather than half-updated.
 */
export function registerErrorCodes(codes: readonly string[]): void {
    for (const code of codes) {
        if (!isErrorCodeFormat(code)) {
            throw new Error(
                `Invalid error code format: "${code}". Must match ${ERROR_CODE_FORMAT}.`,
            );
        }
    }
    for (const code of codes) {
        registeredErrorCodes.add(code);
    }
}

export function isValidErrorCode(code: string): code is ErrorCode {
    return registeredErrorCodes.has(code);
}
