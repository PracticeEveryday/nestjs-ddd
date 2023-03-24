import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CreateUserReqDto } from './create-user.request.dto';

@Controller('users')
export class CreateUserHttpController {
    constructor(private readonly commandBus: CommandBus) {}

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
    })
    @Post('/sign-up')
    async create(@Body() body: CreateUserReqDto) {
        const command = new CreateUserCommand(body);

        return await this.commandBus.execute(command);
    }
}
