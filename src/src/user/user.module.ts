import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordModule } from '🔥/libs/module/password/password.module';

import { CreateUserCommand } from './application/commands/create-user/create-user.command';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { UserDomainService } from './domain/user/inboundPorts/user.domain.service';
import { UserDetailEntity } from './infrastructure/entity/user-detail.entity';
import { UserEntity } from './infrastructure/entity/user.entity';
import { FindUserByIdHandler } from './infrastructure/queries/FindUserByIdHandler';
import { FindUserByIdQuery } from './infrastructure/queries/FindUserByIdQuery';
import { UserDetailRepositoryImpl } from './infrastructure/repository/user-detail.repository';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository';
import { UserController } from './interface/user.controller';

const httpController = [UserController];

const commands = [CreateUserCommand, CreateUserHandler];
const queries = [FindUserByIdQuery, FindUserByIdHandler];
const repositories = [UserDetailRepositoryImpl, UserRepositoryImpl];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity, UserDetailEntity]), PasswordModule],
    controllers: [...httpController],
    providers: [...commands, ...queries, ...repositories, UserDomainService],
})
export class UserModule {}
