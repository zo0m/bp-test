import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inspection } from '@acme/inspection/server/inspection-server';
import { InspectionService } from './inspection.service';

@Module({
    imports: [TypeOrmModule.forFeature([Inspection])],
    providers: [InspectionService],
    exports: [InspectionService],
})
export class InspectionServiceModule {}
