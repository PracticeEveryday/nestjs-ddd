import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '🔥/database/database.module';
import { InjectionToken } from '🔥/database/injection.token';
import { CreateUserCommand } from './application/commands/create-user/create-user.command';
import { CreateUserService } from './application/commands/create-user/create-user.service';

import { UserEntity } from './infrastructure/entity/user.entity';
import { UserInjectionToken } from './infrastructure/repository/injectionToken';

import { UserRepositoryImpl } from './infrastructure/repository/user.repository';
import { UserController } from './interface/create-user.http.controller';

const httpController = [UserController];

const provider = [
    {
        provide: UserInjectionToken.USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: [InjectionToken.MAIN_DATABASE],
    },
];

const command = [CreateUserService, CreateUserCommand];

@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [...httpController],
    providers: [...command, ...provider, UserRepositoryImpl],
})
export class UserModule {}
