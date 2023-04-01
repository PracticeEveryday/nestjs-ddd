import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { UserDetailEntity } from '🔥/module/user/infrastructure/entity/user-detail.entity';
import { UserEntity } from '🔥/module/user/infrastructure/entity/user.entity';

@Injectable()
export class MysqlConfigProvider implements TypeOrmOptionsFactory {
    private readonly host: string;
    private readonly port: number;
    private readonly username: string;
    private readonly password: string;
    private readonly database: string;

    constructor(private configService: ConfigService) {
        this.host = configService.get<string>('DB_HOST') || '';
        this.username = configService.get<string>('DB_USERNAME') || '';
        this.password = configService.get<string>('DB_PASSWORD') || '';
        this.database = configService.get<string>('DB_DATABASE') || '';
        this.port = this.configService.get<number>('DB_PORT') || 3306;
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
