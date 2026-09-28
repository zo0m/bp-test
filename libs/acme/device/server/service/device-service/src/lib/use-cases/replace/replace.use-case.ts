import { Injectable } from '@nestjs/common';
import { DeviceService } from '@acme/device/server/device-service';
import type { Device } from '@acme/device/shared/device-types';

/**
 * Replace — Swap this device for another unit
 *
 * Blueprint generated this signature, its dependencies and its wiring from the
 * model. What Replace MEANS is the part the model does not carry,
 * so the body below is yours: this file is seeded and will not be regenerated.
 */
@Injectable()
export class DeviceReplaceUseCase {
    constructor(private readonly deviceService: DeviceService) {}

    async execute(
        id: string,
        input: {
            replacement: string;
            reason: string;
        },
    ): Promise<Device> {
        await this.deviceService.findOne(id);
        throw new Error('DeviceReplaceUseCase is not implemented');
    }
}
