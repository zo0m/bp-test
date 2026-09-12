import { IsOptional, IsDateString, IsString } from 'class-validator';
import type { UpdateInspectionDto as IUpdateInspectionDto } from '@acme/inspection/shared/inspection-shared';

export class UpdateInspectionDto implements IUpdateInspectionDto {
    @IsOptional()
    @IsDateString()
    completedAt?: string;

    @IsOptional()
    @IsString()
    device?: string;
}
