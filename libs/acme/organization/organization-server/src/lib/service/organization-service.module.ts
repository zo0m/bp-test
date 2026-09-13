import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '@acme/organization/server/organization-server';
import { OrganizationService } from './organization.service';

@Module({
    imports: [TypeOrmModule.forFeature([Organization])],
    providers: [OrganizationService],
    exports: [OrganizationService],
})
export class OrganizationServiceModule {}
