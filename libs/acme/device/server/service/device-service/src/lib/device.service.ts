import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '@acme/device/server/device-model';
import type { CreateDeviceDto, UpdateDeviceDto } from '@acme/device/shared/device-types';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device)
        private readonly deviceRepository: Repository<Device>,
    ) {}

    // Pagination defaults are applied once, by PaginationQueryDto at the REST
    // boundary; callers must pass concrete values.
    async findAll({
        page,
        pageSize,
    }: Required<PaginationParams>): Promise<PaginatedResponse<Device>> {
        const skip = (page - 1) * pageSize;

        const [data, total] = await this.deviceRepository.findAndCount({
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

    async create(dto: CreateDeviceDto): Promise<Device> {
        const device = this.deviceRepository.create(dto);
        return this.deviceRepository.save(device);
    }

    async findOne(id: string): Promise<Device> {
        const device = await this.deviceRepository.findOne({ where: { id } });
        if (!device) {
            throw new NotFoundException(`Device with id ${id} not found`);
        }
        return device;
    }

    async update(id: string, dto: UpdateDeviceDto): Promise<Device> {
        const device = await this.findOne(id);
        Object.assign(device, dto);
        return this.deviceRepository.save(device);
    }

    async remove(id: string): Promise<void> {
        const device = await this.findOne(id);
        await this.deviceRepository.remove(device);
    }
}
