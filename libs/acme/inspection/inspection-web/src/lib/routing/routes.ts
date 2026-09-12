export const INSPECTION_ROUTES = {
    CREATE: 'inspection.create',
    DETAILS: 'inspection.details',
    LIST: 'inspection.list',
} as const;

export type InspectionRouteName = (typeof INSPECTION_ROUTES)[keyof typeof INSPECTION_ROUTES];
