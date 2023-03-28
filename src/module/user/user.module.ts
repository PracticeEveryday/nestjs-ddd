import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '🔥/database/database.module';
import { InjectionToken } from '🔥/database/injection.token';
import { CreateUserCommand } from './application/commands/create-user/create-user.command';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { UserDomainService } from './domain/inboundPorts/user.domain.service';

import { UserEntity } from './infrastructure/entity/user.entity';
import { FindUserByIdHandler } from './infrastructure/queries/find-user-by-id.handler';
import { FindUserByIdQuery } from './infrastructure/queries/find-user-by-Id.query';
import { UserInjectionToken } from './infrastructure/repository/injectionToken';

import { UserRepositoryImpl } from './infrastructure/repository/user.repository';
import { UserController } from './interface/user.controller';

const httpController = [UserController];

const provider = [
    {
        provide: UserInjectionToken.USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: [InjectionToken.MAIN_DATABASE],
    },
];

const commands = [CreateUserHandler, CreateUserCommand];
const queries = [FindUserByIdQuery, FindUserByIdHandler];

@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [...httpController],
    providers: [...commands, ...queries, ...provider, UserRepositoryImpl, UserDomainService],
})
export class UserModule {}
