import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '🔥/src/user/domain/user/inboundPorts/user.domain.service';
import { UserSerivcePort } from '🔥/src/user/domain/user/inboundPorts/user.domain.service.port';

import { SignInCommand } from './sign-in.command';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
    constructor(@Inject(UserDomainService) private userDomainService: UserSerivcePort) {}

    public async execute(command: SignInCommand) {
        return await this.userDomainService.signIn(command);
    }
}
