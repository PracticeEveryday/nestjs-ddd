import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '🔥/src/user/domain/user/inboundPorts/user.domain.service';
import { UserSerivcePort } from '🔥/src/user/domain/user/inboundPorts/user.domain.service.port';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserDomainService) private userDomainService: UserSerivcePort) {}

    async execute(command: CreateUserCommand) {
        return await this.userDomainService.signUp(command);
    }
}
