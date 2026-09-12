import { Module } from '@nestjs/common';
import { LocationServiceModule } from '@acme/location/server/location-server';
import { LocationController } from './location.controller';

@Module({
    imports: [LocationServiceModule],
    controllers: [LocationController],
    providers: [],
})
export class LocationModule {}
