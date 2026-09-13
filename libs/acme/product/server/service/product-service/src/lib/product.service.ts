import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@acme/product/server/product-model';
import type { CreateProductDto, UpdateProductDto } from '@acme/product/shared/product-types';
import type { PaginatedResponse, PaginationParams } from '@core/shared/types';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    // Pagination defaults are applied once, by PaginationQueryDto at the REST
    // boundary; callers must pass concrete values.
    async findAll({
        page,
        pageSize,
    }: Required<PaginationParams>): Promise<PaginatedResponse<Product>> {
        const skip = (page - 1) * pageSize;

        const [data, total] = await this.productRepository.findAndCount({
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

    async create(dto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(dto);
        return this.productRepository.save(product);
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async update(id: string, dto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, dto);
        return this.productRepository.save(product);
    }

    async remove(id: string): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
}
