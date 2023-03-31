import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { DatabaseModule } from '🔥/database/database.module';
import { InjectionToken } from '🔥/database/injection.token';

import { CreateUserCommand } from './application/commands/create-user/create-user.command';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { UserDomainService } from './domain/user/inboundPorts/user.domain.service';
import { UserDetailEntity } from './infrastructure/entity/user-detail.entity';
import { UserEntity } from './infrastructure/entity/user.entity';
import { FindUserByIdHandler } from './infrastructure/queries/FindUserByIdHandler';
import { FindUserByIdQuery } from './infrastructure/queries/FindUserByIdQuery';
import { UserInjectionToken } from './infrastructure/repository/injectionToken';
import { UserDetailRepositoryImpl } from './infrastructure/repository/user-detail.repository';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository';
import { UserController } from './interface/user.controller';

const httpController = [UserController];

const provider = [
    {
        provide: UserInjectionToken.USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: [InjectionToken.MAIN_DATABASE],
    },
    {
        provide: UserInjectionToken.USER_DETAIL_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserDetailEntity),
        inject: [InjectionToken.MAIN_DATABASE],
    },
];

const commands = [CreateUserCommand, CreateUserHandler];
const queries = [FindUserByIdQuery, FindUserByIdHandler];
const repositories = [UserDetailRepositoryImpl, UserRepositoryImpl];
@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [...httpController],
    providers: [...commands, ...queries, ...provider, ...repositories, UserDomainService],
})
export class UserModule {}
