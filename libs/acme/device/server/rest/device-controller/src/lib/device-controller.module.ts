import { Module } from '@nestjs/common';
import {
    DeviceServiceModule,
    DeviceDeactivateUseCase,
    DeviceReplaceUseCase,
    DeviceMoveUseCase,
    DeviceGenerateQrCodeUseCase,
} from '@acme/device/server/device-service';
import { DeviceController } from './device.controller';

@Module({
    imports: [DeviceServiceModule],
    controllers: [DeviceController],
    providers: [
        DeviceDeactivateUseCase,
        DeviceReplaceUseCase,
        DeviceMoveUseCase,
        DeviceGenerateQrCodeUseCase,
    ],
})
export class DeviceModule {}
