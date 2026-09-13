export interface CreateOrganizationDto {
    name: string;
    nickname?: string;
}

export interface UpdateOrganizationDto {
    name?: string;
    nickname?: string;
}
