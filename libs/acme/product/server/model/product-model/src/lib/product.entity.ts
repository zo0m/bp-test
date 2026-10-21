import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '@core/server/database';
import type { ProductStatus } from '@acme/product/shared/product-types';
import { PRODUCT_DEFAULT_STATUS } from '@acme/product/shared/product-constants';

@Entity('products')
export class Product extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 255,
    })
    name!: string;

    @Column({
        type: 'text',
    })
    description!: string;

    // pg returns NUMERIC as a string; without the transformer the API would
    // ship "price": "0.00" against the shared type's price: number.
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string | null) => (value === null ? value : parseFloat(value)),
        },
    })
    price!: number;

    @Column({
        type: 'varchar',
        length: 32,
        default: PRODUCT_DEFAULT_STATUS,
    })
    status!: ProductStatus;

    // Foreign key to organization, stored as its id. One entity may not
    // reference another, so this is a key rather than an object relation.
    @Index()
    @Column({
        type: 'uuid',
    })
    organization!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    sku?: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    internalNotes?: string;
}
