import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '🔥/module/user/domain/inboundPorts/user.domain.service';

import { UserRepositoryImpl } from '🔥/module/user/infrastructure/repository/user.repository';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserRepositoryImpl) private userService: UserService) {}

    async execute(command: CreateUserCommand) {
        return await this.userService.signUp(command);
    }
}
