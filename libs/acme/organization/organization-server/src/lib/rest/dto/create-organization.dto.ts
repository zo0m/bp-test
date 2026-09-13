import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import type { CreateOrganizationDto as ICreateOrganizationDto } from '@acme/organization/shared/organization-shared';
import {
    ORGANIZATION_NAME_MAX_LENGTH,
    ORGANIZATION_NICKNAME_MAX_LENGTH,
} from '@acme/organization/shared/organization-shared';

export class CreateOrganizationDto implements ICreateOrganizationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(ORGANIZATION_NAME_MAX_LENGTH)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(ORGANIZATION_NICKNAME_MAX_LENGTH)
    nickname?: string;
}
