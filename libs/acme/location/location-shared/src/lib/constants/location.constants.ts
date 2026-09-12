export const LOCATION_NAME_MAX_LENGTH = 160;

export const LOCATION_API_PATH = '/locations';

export const LOCATION_QUERY_KEYS = {
    all: ['locations'] as const,
    lists: () => [...LOCATION_QUERY_KEYS.all, 'list'] as const,
    list: (params: object) => [...LOCATION_QUERY_KEYS.lists(), params] as const,
    details: () => [...LOCATION_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...LOCATION_QUERY_KEYS.details(), id] as const,
} as const;
