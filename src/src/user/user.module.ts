import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '🔥/libs/module/auth/auth.module';
import { PasswordModule } from '🔥/libs/module/password/password.module';

import { CreateUserCommand } from './application/commands/create-user/create-user.command';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { SignInCommand } from './application/commands/sign-in/sign-in.command';
import { SignInHandler } from './application/commands/sign-in/sign-in.handler';
import { UserDomainService } from './domain/user/inboundPorts/user.domain.service';
import { UserDetailEntity } from './infrastructure/entity/user-detail.entity';
import { UserEntity } from './infrastructure/entity/user.entity';
import { FindUserByIdHandler } from './infrastructure/queries/FindUserByIdHandler';
import { FindUserByIdQuery } from './infrastructure/queries/FindUserByIdQuery';
import { UserDetailRepositoryImpl } from './infrastructure/repository/user-detail.repository';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository';
import { UserController } from './interface/user.controller';

const httpController = [UserController];

const commands = [CreateUserCommand, SignInCommand];
const handlers = [CreateUserHandler, SignInHandler];
const queries = [FindUserByIdQuery, FindUserByIdHandler];

const repositories = [UserDetailRepositoryImpl, UserRepositoryImpl];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity, UserDetailEntity]), PasswordModule, AuthModule],
    controllers: [...httpController],
    providers: [...commands, ...handlers, ...queries, ...repositories, UserDomainService],
    exports: [CqrsModule],
})
export class UserModule {}
