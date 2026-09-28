import { Module } from '@nestjs/common';
import { InspectionServiceModule } from '@acme/inspection/server/inspection-server';
import { InspectionController } from './inspection.controller';

@Module({
    imports: [InspectionServiceModule],
    controllers: [InspectionController],
    providers: [],
})
export class InspectionModule {}
