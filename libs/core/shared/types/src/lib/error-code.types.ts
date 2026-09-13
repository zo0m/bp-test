/**
 * Error codes for API error responses.
 *
 * Core codes get autocomplete; a domain registers its own through
 * `registerErrorCodes` from `@core/shared/constants`, so they are admitted as
 * strings rather than enumerated here.
 */
export type CoreErrorCode =
    | 'VALIDATION_FAILED'
    | 'NOT_FOUND'
    | 'CONFLICT'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'INTERNAL_ERROR'
    | 'DATABASE_ERROR'
    | 'SERVICE_UNAVAILABLE'
    | 'BAD_REQUEST'
    | 'UNPROCESSABLE'
    | 'RATE_LIMITED'
    | 'NETWORK_ERROR';

// The intersection with `{}` keeps the literal union's autocomplete while
// still accepting any registered domain code.
export type ErrorCode = CoreErrorCode | (string & {});

/** The body a generated controller returns when a request fails. */
export interface ErrorResponse {
    code: ErrorCode;
    message: string;
    details?: unknown;
}
