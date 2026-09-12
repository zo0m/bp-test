import { IsOptional, IsDateString, IsString } from 'class-validator';
import type { CreateInspectionDto as ICreateInspectionDto } from '@acme/inspection/shared/inspection-shared';

export class CreateInspectionDto implements ICreateInspectionDto {
    @IsOptional()
    @IsDateString()
    completedAt?: string;

    @IsString()
    device!: string;
}
