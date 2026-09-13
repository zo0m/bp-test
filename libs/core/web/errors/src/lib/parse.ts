import { ERROR_CODES, httpStatusToErrorCode } from '@core/shared/constants';
import type { ErrorCode } from '@core/shared/types';

export interface ParsedError {
    message: string;
    code: ErrorCode;
    /** True when the message came from the server rather than from here. */
    hasServerMessage: boolean;
    isNetworkError: boolean;
    isAuthError: boolean;
}

function messageFrom(body: unknown): string | null {
    if (typeof body !== 'object' || body === null) return null;
    const message = (body as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim()) return message;
    // A validation failure often arrives as a list of field messages.
    if (Array.isArray(message) && message.length > 0) return message.map(String).join(' ');
    return null;
}

function codeFrom(body: unknown, status: number): ErrorCode {
    if (typeof body === 'object' && body !== null) {
        const code = (body as { code?: unknown }).code;
        if (typeof code === 'string' && code) return code;
    }
    return httpStatusToErrorCode(status);
}

/**
 * Turn anything a failed request threw into something a person can read.
 *
 * Generated pages render `parseApiError(error).message` directly, so this must
 * always produce a sentence — never an empty string, and never `[object
 * Object]`.
 */
export function parseApiError(error: unknown): ParsedError {
    if (error !== null && typeof error === 'object' && 'status' in error && 'data' in error) {
        const status = Number((error as { status: unknown }).status);
        const body = (error as { data: unknown }).data;
        const serverMessage = messageFrom(body);
        return {
            message: serverMessage ?? `The request failed (${status}).`,
            code: codeFrom(body, status),
            hasServerMessage: serverMessage !== null,
            isNetworkError: false,
            isAuthError: status === 401 || status === 403,
        };
    }

    if (
        error !== null &&
        typeof error === 'object' &&
        (error as Error).name === 'ApiNetworkError'
    ) {
        return {
            message: 'Could not reach the server. Check your connection and try again.',
            code: ERROR_CODES.NETWORK_ERROR,
            hasServerMessage: false,
            isNetworkError: true,
            isAuthError: false,
        };
    }

    if (error instanceof Error && error.message) {
        return {
            message: error.message,
            code: ERROR_CODES.INTERNAL_ERROR,
            hasServerMessage: false,
            isNetworkError: false,
            isAuthError: false,
        };
    }

    return {
        message: 'Something went wrong.',
        code: ERROR_CODES.INTERNAL_ERROR,
        hasServerMessage: false,
        isNetworkError: false,
        isAuthError: false,
    };
}
