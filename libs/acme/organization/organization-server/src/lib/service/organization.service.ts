import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '@acme/organization/server/organization-server';
import type {
    CreateOrganizationDto,
    UpdateOrganizationDto,
} from '@acme/organization/shared/organization-shared';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    // Pagination defaults are applied once, by PaginationQueryDto at the REST
    // boundary; callers must pass concrete values.
    async findAll({
        page,
        pageSize,
    }: Required<PaginationParams>): Promise<PaginatedResponse<Organization>> {
        const skip = (page - 1) * pageSize;

        const [data, total] = await this.organizationRepository.findAndCount({
            skip,
            take: pageSize,
            order: { createdAt: 'DESC' },
        });

        return {
            data,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async findOne(id: string): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({ where: { id } });
        if (!organization) {
            throw new NotFoundException(`Organization with id ${id} not found`);
        }
        return organization;
    }
}
