/**
 * The request and response shapes every generated list endpoint speaks.
 */
export interface PaginationParams {
    page?: number;
    pageSize?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
