import { Module } from '@nestjs/common';
import { ProductServiceModule } from '@acme/product/server/product-service';
import { ProductController } from './product.controller';

@Module({
    imports: [ProductServiceModule],
    controllers: [ProductController],
    providers: [],
})
export class ProductModule {}
