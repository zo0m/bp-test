export const INSPECTION_API_PATH = '/inspections';

export const INSPECTION_QUERY_KEYS = {
    all: ['inspections'] as const,
    lists: () => [...INSPECTION_QUERY_KEYS.all, 'list'] as const,
    list: (params: object) => [...INSPECTION_QUERY_KEYS.lists(), params] as const,
    details: () => [...INSPECTION_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...INSPECTION_QUERY_KEYS.details(), id] as const,
} as const;
