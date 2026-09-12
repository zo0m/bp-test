import { IsOptional, IsString, MaxLength } from 'class-validator';
import type { UpdateLocationDto as IUpdateLocationDto } from '@acme/location/shared/location-shared';
import { LOCATION_NAME_MAX_LENGTH } from '@acme/location/shared/location-shared';

export class UpdateLocationDto implements IUpdateLocationDto {
    @IsOptional()
    @IsString()
    @MaxLength(LOCATION_NAME_MAX_LENGTH)
    name?: string;
}
