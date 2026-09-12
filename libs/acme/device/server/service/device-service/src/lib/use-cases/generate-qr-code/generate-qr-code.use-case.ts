import { Injectable } from '@nestjs/common';
import { DeviceService } from '@acme/device/server/device-service';
import type { Device } from '@acme/device/shared/device-types';

/**
 * Generate QR Code — Produce a scannable asset label
 *
 * Blueprint generated this signature, its dependencies and its wiring from the
 * model. What Generate QR Code MEANS is the part the model does not carry,
 * so the body below is yours: this file is seeded and will not be regenerated.
 */
@Injectable()
export class DeviceGenerateQrCodeUseCase {
    constructor(private readonly deviceService: DeviceService) {}

    async execute(id: string): Promise<Device> {
        await this.deviceService.findOne(id);
        throw new Error('DeviceGenerateQrCodeUseCase is not implemented');
    }
}
