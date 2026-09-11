import { IsOptional, IsString, MaxLength } from 'class-validator';
import type { UpdateOrganizationDto as IUpdateOrganizationDto } from '@acme/organization/shared/organization-shared';
import { ORGANIZATION_NAME_MAX_LENGTH } from '@acme/organization/shared/organization-shared';

export class UpdateOrganizationDto implements IUpdateOrganizationDto {
    @IsOptional()
    @IsString()
    @MaxLength(ORGANIZATION_NAME_MAX_LENGTH)
    name?: string;
}
