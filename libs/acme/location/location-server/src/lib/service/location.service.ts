import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '@acme/location/server/location-server';
import type { CreateLocationDto, UpdateLocationDto } from '@acme/location/shared/location-shared';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>,
    ) {}

    // Pagination defaults are applied once, by PaginationQueryDto at the REST
    // boundary; callers must pass concrete values.
    async findAll({
        page,
        pageSize,
    }: Required<PaginationParams>): Promise<PaginatedResponse<Location>> {
        const skip = (page - 1) * pageSize;

        const [data, total] = await this.locationRepository.findAndCount({
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

    async findOne(id: string): Promise<Location> {
        const location = await this.locationRepository.findOne({ where: { id } });
        if (!location) {
            throw new NotFoundException(`Location with id ${id} not found`);
        }
        return location;
    }
}
