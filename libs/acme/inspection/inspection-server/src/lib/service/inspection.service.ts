import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspection } from '@acme/inspection/server/inspection-server';
import type {
    CreateInspectionDto,
    UpdateInspectionDto,
} from '@acme/inspection/shared/inspection-shared';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';

@Injectable()
export class InspectionService {
    constructor(
        @InjectRepository(Inspection)
        private readonly inspectionRepository: Repository<Inspection>,
    ) {}

    // Pagination defaults are applied once, by PaginationQueryDto at the REST
    // boundary; callers must pass concrete values.
    async findAll({
        page,
        pageSize,
    }: Required<PaginationParams>): Promise<PaginatedResponse<Inspection>> {
        const skip = (page - 1) * pageSize;

        const [data, total] = await this.inspectionRepository.findAndCount({
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

    async create(dto: CreateInspectionDto): Promise<Inspection> {
        const inspection = this.inspectionRepository.create(dto);
        return this.inspectionRepository.save(inspection);
    }

    async findOne(id: string): Promise<Inspection> {
        const inspection = await this.inspectionRepository.findOne({ where: { id } });
        if (!inspection) {
            throw new NotFoundException(`Inspection with id ${id} not found`);
        }
        return inspection;
    }

    /** Transition */
    async transition(id: string): Promise<Inspection> {
        const inspection = await this.findOne(id);
        return this.inspectionRepository.save(inspection);
    }
}
