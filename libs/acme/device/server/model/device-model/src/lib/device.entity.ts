import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '@core/server/database';
import type { DeviceStatus } from '@acme/device/shared/device-types';
import { DEVICE_DEFAULT_STATUS } from '@acme/device/shared/device-constants';

@Entity('devices')
export class Device extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 64,
        unique: true,
    })
    serial!: string;

    @Column({
        type: 'varchar',
        length: 32,
        default: DEVICE_DEFAULT_STATUS,
    })
    status!: DeviceStatus;

    // Foreign key to location, stored as its id. One entity may not
    // reference another, so this is a key rather than an object relation.
    @Index()
    @Column({
        type: 'uuid',
    })
    location!: string;
}
