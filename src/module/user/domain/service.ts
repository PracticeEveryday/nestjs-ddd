import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user/create-user.command';
import { CreateUserReqDto } from '../commands/create-user/create-user.request.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly commandBus: CommandBus) {}

    public async signUp(createUserReqDto: CreateUserReqDto) {
        await this.commandBus.execute(new CreateUserCommand(createUserReqDto));
    }
}
