import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDomainService } from '🔥/module/user/domain/inboundPorts/user.domain.service';

import { UserRepositoryImpl } from '🔥/module/user/infrastructure/repository/user.repository';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserRepositoryImpl) private userDomainService: UserDomainService) {}

    async execute(command: CreateUserCommand) {
        return await this.userDomainService.signUp(command);
    }
}
