export const LOCATION_ROUTES = {} as const;

export type LocationRouteName = (typeof LOCATION_ROUTES)[keyof typeof LOCATION_ROUTES];
