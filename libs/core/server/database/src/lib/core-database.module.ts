import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * The database connection, read from the environment.
 *
 * `autoLoadEntities` is what lets a domain module register its own entity
 * through `TypeOrmModule.forFeature` without this module knowing the domains
 * exist — which is the property that makes generated domains additive.
 */
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres' as const,
                host: process.env['DATABASE_HOST'] ?? 'localhost',
                port: Number(process.env['DATABASE_PORT'] ?? 5432),
                username: process.env['DATABASE_USER'] ?? 'postgres',
                password: process.env['DATABASE_PASSWORD'] ?? 'postgres',
                database: process.env['DATABASE_NAME'] ?? 'app',
                // Schema management belongs to a migration step, not to boot.
                synchronize: false,
                autoLoadEntities: true,
            }),
        }),
    ],
    exports: [TypeOrmModule],
})
export class CoreDatabaseModule {}
