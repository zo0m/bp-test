import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import type { CreateLocationDto as ICreateLocationDto } from '@acme/location/shared/location-shared';
import { LOCATION_NAME_MAX_LENGTH } from '@acme/location/shared/location-shared';

export class CreateLocationDto implements ICreateLocationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(LOCATION_NAME_MAX_LENGTH)
    name!: string;
}
