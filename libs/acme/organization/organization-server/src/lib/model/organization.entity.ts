import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@core/server/database';

@Entity('organizations')
export class Organization extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 120,
    })
    name!: string;
}
