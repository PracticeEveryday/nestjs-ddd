import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { CreateUserReqDto } from './dto/create-user.request.dto';

@Controller('users')
export class UserController {
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
    async create(@Body() createUserReqDto: CreateUserReqDto) {
        return await this.commandBus.execute(new CreateUserCommand(createUserReqDto));
    }
}
