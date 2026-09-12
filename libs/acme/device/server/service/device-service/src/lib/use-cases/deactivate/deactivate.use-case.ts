import { Injectable } from '@nestjs/common';
import { DeviceService } from '@acme/device/server/device-service';
import type { Device } from '@acme/device/shared/device-types';

/**
 * Deactivate — Take the device out of service
 *
 * Blueprint generated this signature, its dependencies and its wiring from the
 * model. What Deactivate MEANS is the part the model does not carry,
 * so the body below is yours: this file is seeded and will not be regenerated.
 */
@Injectable()
export class DeviceDeactivateUseCase {
    constructor(private readonly deviceService: DeviceService) {}

    async execute(id: string): Promise<Device> {
        await this.deviceService.findOne(id);
        throw new Error('DeviceDeactivateUseCase is not implemented');
    }
}

// the business logic somebody wrote
