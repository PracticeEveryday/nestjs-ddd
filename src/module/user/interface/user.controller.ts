import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { CreateUserReqDto } from './dto/create-user.request.dto';
import { UserSerivcePort } from '../domain/inboundPorts/user.domain.service.port';
import { UserService } from '../domain/inboundPorts/user.domain.service';

@Controller('users')
export class UserController {
    constructor(@Inject(UserService) private readonly userService: UserSerivcePort) {}

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
        return await this.userService.signUp(new CreateUserCommand(createUserReqDto));
    }
}
