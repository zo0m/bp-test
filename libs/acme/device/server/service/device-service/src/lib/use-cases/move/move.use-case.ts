import { Injectable } from '@nestjs/common';
import { DeviceService } from '@acme/device/server/device-service';
import type { Device } from '@acme/device/shared/device-types';

/**
 * Move — Relocate the device
 *
 * Blueprint generated this signature, its dependencies and its wiring from the
 * model. What Move MEANS is the part the model does not carry,
 * so the body below is yours: this file is seeded and will not be regenerated.
 */
@Injectable()
export class DeviceMoveUseCase {
    constructor(private readonly deviceService: DeviceService) {}

    async execute(
        id: string,
        input: {
            destination: string;
        },
    ): Promise<Device> {
        await this.deviceService.findOne(id);
        throw new Error('DeviceMoveUseCase is not implemented');
    }
}
