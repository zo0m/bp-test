import { IsOptional, IsString, MaxLength, IsIn } from 'class-validator';
import { DEVICE_STATUSES } from '@acme/device/shared/device-types';
import type {
    UpdateDeviceDto as IUpdateDeviceDto,
    DeviceStatus,
} from '@acme/device/shared/device-types';
import { DEVICE_SERIAL_MAX_LENGTH } from '@acme/device/shared/device-constants';

export class UpdateDeviceDto implements IUpdateDeviceDto {
    @IsOptional()
    @IsString()
    @MaxLength(DEVICE_SERIAL_MAX_LENGTH)
    serial?: string;

    @IsOptional()
    @IsString()
    @IsIn(DEVICE_STATUSES)
    status?: DeviceStatus;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    assetTag?: string;
}
