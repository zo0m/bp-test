import { Module } from '@nestjs/common';
import { OrganizationServiceModule } from '@acme/organization/server/organization-server';
import { OrganizationController } from './organization.controller';

@Module({
    imports: [OrganizationServiceModule],
    controllers: [OrganizationController],
    providers: [],
})
export class OrganizationModule {}
