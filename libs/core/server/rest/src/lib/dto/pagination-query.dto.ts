import { Type } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@core/shared/constants';

/**
 * The single place pagination defaults are applied.
 *
 * With the global ValidationPipe's `transform` enabled, an absent query
 * parameter falls back to the field initializer, so every service downstream
 * receives concrete numbers and none of them re-default.
 */
export class PaginationQueryDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(MAX_PAGE_SIZE)
    pageSize: number = DEFAULT_PAGE_SIZE;
}
