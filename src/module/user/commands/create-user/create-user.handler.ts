import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepositoryImpl } from '../../infrastructure/repository/user.repository';
import { UserRepositoryPort } from '../../infrastructure/repository/user.repository.port';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserRepositoryImpl) private userRepository: UserRepositoryPort) {}

    async execute(command: CreateUserCommand) {
        return this.userRepository.signUp(command);
    }
}
