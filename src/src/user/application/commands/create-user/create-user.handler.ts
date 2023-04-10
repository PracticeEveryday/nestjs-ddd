import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PasswordUtils } from '🔥/libs/module/password/password.module';
import { UserDomainService } from '🔥/src/user/domain/user/inboundPorts/user.domain.service';
import { UserSerivcePort } from '🔥/src/user/domain/user/inboundPorts/user.domain.service.port';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserDomainService) private userDomainService: UserSerivcePort, private passwordUtils: PasswordUtils) {}

    public async execute(command: CreateUserCommand) {
        const hashedPassword = await this.passwordUtils.hashPassword(command.password);
        command.password = hashedPassword;

        return await this.userDomainService.signUp(command);
    }
}
