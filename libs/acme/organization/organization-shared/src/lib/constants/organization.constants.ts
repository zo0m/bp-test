export const ORGANIZATION_NAME_MAX_LENGTH = 120;

export const ORGANIZATION_API_PATH = '/organizations';

export const ORGANIZATION_QUERY_KEYS = {
    all: ['organizations'] as const,
    lists: () => [...ORGANIZATION_QUERY_KEYS.all, 'list'] as const,
    list: (params: object) => [...ORGANIZATION_QUERY_KEYS.lists(), params] as const,
    details: () => [...ORGANIZATION_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...ORGANIZATION_QUERY_KEYS.details(), id] as const,
} as const;
