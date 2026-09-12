import { API_BASE_URL } from '@core/shared/constants';

/**
 * The HTTP client every generated API service calls.
 *
 * Built on `fetch` and deliberately small: it presents the response envelope
 * generated code expects (`{ data }`) and nothing more, so adopting a
 * generated application does not also mean adopting a transport library.
 */
export interface ApiResponse<T> {
    data: T;
    status: number;
}

export interface RequestOptions {
    /**
     * Query parameters. Typed as `object` rather than
     * `Record<string, unknown>` so that a plain interface — which has no index
     * signature — can be passed straight through.
     */
    params?: object;
    signal?: AbortSignal;
}

/**
 * Thrown for any non-2xx response, carrying the parsed body so an error
 * handler can read the server's own code and message.
 */
export class ApiRequestError extends Error {
    readonly status: number;
    readonly data: unknown;

    constructor(status: number, data: unknown, message: string) {
        super(message);
        this.name = 'ApiRequestError';
        this.status = status;
        this.data = data;
    }
}

/** A request that never reached a server: offline, DNS, CORS, abort. */
export class ApiNetworkError extends Error {
    // `cause` goes through Error's own option rather than a parameter
    // property: declaring one would shadow `Error.cause`, which a workspace
    // with `noImplicitOverride` rejects.
    constructor(message: string, options?: { cause?: unknown }) {
        super(message, options);
        this.name = 'ApiNetworkError';
    }
}

const DEFAULT_TIMEOUT_MS = 30_000;

function buildUrl(path: string, params?: object): string {
    const base = `${API_BASE_URL}${path}`;
    if (!params) return base;
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params as Record<string, unknown>)) {
        if (value === undefined || value === null || value === '') continue;
        search.append(key, String(value));
    }
    const query = search.toString();
    return query ? `${base}?${query}` : base;
}

async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {},
): Promise<ApiResponse<T>> {
    // A hung backend must surface as an error rather than an endless spinner.
    const timeout = new AbortController();
    const timer = setTimeout(() => timeout.abort(), DEFAULT_TIMEOUT_MS);

    let response: Response;
    try {
        response = await fetch(buildUrl(path, options.params), {
            method,
            headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
            ...(body === undefined ? {} : { body: JSON.stringify(body) }),
            signal: options.signal ?? timeout.signal,
        });
    } catch (cause) {
        throw new ApiNetworkError('The request did not reach the server.', { cause });
    } finally {
        clearTimeout(timer);
    }

    // 204, and any empty body, must not go through JSON.parse.
    const text = await response.text();
    let parsed: unknown = null;
    if (text) {
        try {
            parsed = JSON.parse(text);
        } catch {
            parsed = text;
        }
    }

    if (!response.ok) {
        const message =
            typeof parsed === 'object' && parsed !== null && 'message' in parsed
                ? String((parsed as { message: unknown }).message)
                : `Request failed with status ${response.status}.`;
        throw new ApiRequestError(response.status, parsed, message);
    }

    return { data: parsed as T, status: response.status };
}

export const apiClient = {
    get: <T,>(path: string, options?: RequestOptions) =>
        request<T>('GET', path, undefined, options),
    post: <T,>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>('POST', path, body, options),
    put: <T,>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>('PUT', path, body, options),
    patch: <T,>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>('PATCH', path, body, options),
    delete: <T = void,>(path: string, options?: RequestOptions) =>
        request<T>('DELETE', path, undefined, options),
};
