import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { UserDetailEntity } from '🔥/src/user/infrastructure/entity/user-detail.entity';
import { UserEntity } from '🔥/src/user/infrastructure/entity/user.entity';

@Injectable()
export class MysqlConfigProvider implements TypeOrmOptionsFactory {
    private readonly host: string;
    private readonly port: number;
    private readonly username: string;
    private readonly password: string;
    private readonly database: string;

    constructor(private configService: ConfigService) {
        this.host = configService.getOrThrow<string>('DB_HOST');
        this.username = configService.getOrThrow<string>('DB_USERNAME');
        this.password = configService.getOrThrow<string>('DB_PASSWORD');
        this.database = configService.getOrThrow<string>('DB_DATABASE');
        this.port = +this.configService.getOrThrow<number>('DB_PORT');
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            // autoLoadEntities: true,
            synchronize: true,
            // logging: true,
            namingStrategy: new SnakeNamingStrategy(),
            entities: [UserEntity, UserDetailEntity],
        };
    }
}
