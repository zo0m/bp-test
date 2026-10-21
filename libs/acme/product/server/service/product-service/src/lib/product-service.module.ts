import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@acme/product/server/product-model';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductServiceModule {}
