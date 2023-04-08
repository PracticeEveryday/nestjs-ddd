import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MysqlConfigProvider } from './mysql-config.provider';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: MysqlConfigProvider,
        }),
    ],

    exports: [TypeOrmModule],
})
export class DatabaseModule {}
