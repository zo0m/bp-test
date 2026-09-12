import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '@core/server/database';

@Entity('inspections')
export class Inspection extends BaseEntity {
    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    completedAt?: string;

    // Foreign key to device, stored as its id. One entity may not
    // reference another, so this is a key rather than an object relation.
    @Index()
    @Column({
        type: 'uuid',
    })
    device!: string;
}
