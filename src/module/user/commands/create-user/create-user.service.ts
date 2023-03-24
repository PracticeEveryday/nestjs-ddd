import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepositoryImpl } from '../../infrastructure/repository/user.repository';
import { UserRepositoryPort } from '../../infrastructure/repository/user.repository.port';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserRepositoryImpl) private userRepository: UserRepositoryPort) {}

    async execute(command: CreateUserCommand) {
        const user = await this.userRepository.findOneByEmail(command.email);
        if (user) throw new BadRequestException('중복된 이메일입니다.');

        return this.userRepository.signUp(command);
    }
}
