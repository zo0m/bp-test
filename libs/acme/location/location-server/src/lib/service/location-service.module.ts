import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '@acme/location/server/location-server';
import { LocationService } from './location.service';

@Module({
    imports: [TypeOrmModule.forFeature([Location])],
    providers: [LocationService],
    exports: [LocationService],
})
export class LocationServiceModule {}
