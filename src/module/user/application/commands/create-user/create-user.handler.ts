import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '🔥/module/user/domain/inboundPorts/user.domain.service';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserDomainService) private userDomainService: UserDomainService) {}

    async execute(command: CreateUserCommand) {
        return await this.userDomainService.signUp(command);
    }
}
