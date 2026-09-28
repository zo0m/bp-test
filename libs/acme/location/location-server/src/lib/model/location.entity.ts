import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@core/server/database';

@Entity('locations')
export class Location extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 160,
    })
    name!: string;
}
