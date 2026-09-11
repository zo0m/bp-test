import {
    IsString,
    IsNotEmpty,
    MaxLength,
    IsNumber,
    Min,
    Max,
    IsOptional,
    IsIn,
    Matches,
} from 'class-validator';
import { PRODUCT_STATUSES } from '@acme/product/shared/product-types';
import type {
    CreateProductDto as ICreateProductDto,
    ProductStatus,
} from '@acme/product/shared/product-types';
import {
    PRODUCT_NAME_MAX_LENGTH,
    PRODUCT_DESCRIPTION_MAX_LENGTH,
    PRODUCT_SKU_MAX_LENGTH,
    PRODUCT_INTERNAL_NOTES_MAX_LENGTH,
    PRODUCT_PRICE_MIN,
    PRODUCT_PRICE_MAX,
} from '@acme/product/shared/product-constants';

export class CreateProductDto implements ICreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(PRODUCT_NAME_MAX_LENGTH)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(PRODUCT_DESCRIPTION_MAX_LENGTH)
    description!: string;

    @IsNumber()
    @Min(PRODUCT_PRICE_MIN)
    @Max(PRODUCT_PRICE_MAX)
    price!: number;

    @IsOptional()
    @IsString()
    @IsIn(PRODUCT_STATUSES)
    status?: ProductStatus;

    @IsString()
    organization!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(PRODUCT_SKU_MAX_LENGTH)
    @Matches('^[a-z0-9]+(?:-[a-z0-9]+)*$')
    sku!: string;

    @IsOptional()
    @IsString()
    @MaxLength(PRODUCT_INTERNAL_NOTES_MAX_LENGTH)
    internalNotes?: string;

    @IsOptional()
    @IsString()
    gtin?: string;
}
