import { IsString, IsNotEmpty, MaxLength, IsOptional, IsIn } from 'class-validator';
import { DEVICE_STATUSES } from '@acme/device/shared/device-types';
import type {
    CreateDeviceDto as ICreateDeviceDto,
    DeviceStatus,
} from '@acme/device/shared/device-types';
import { DEVICE_SERIAL_MAX_LENGTH } from '@acme/device/shared/device-constants';

export class CreateDeviceDto implements ICreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(DEVICE_SERIAL_MAX_LENGTH)
    serial!: string;

    @IsOptional()
    @IsString()
    @IsIn(DEVICE_STATUSES)
    status?: DeviceStatus;

    @IsString()
    location!: string;
}
