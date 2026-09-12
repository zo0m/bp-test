import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@core/server/database';
import { DeviceModule } from '@acme/device/server/device-controller';
import { LocationModule } from '@acme/location/server/location-server';
import { InspectionModule } from '@acme/inspection/server/inspection-server';

@Module({
    imports: [CoreDatabaseModule, DeviceModule, LocationModule, InspectionModule],
})
export class AppModule {}
