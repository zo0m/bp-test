export const ORGANIZATION_ROUTES = {} as const;

export type OrganizationRouteName = (typeof ORGANIZATION_ROUTES)[keyof typeof ORGANIZATION_ROUTES];
