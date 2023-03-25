import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { CreateUserReqDto } from './dto/create-user.request.dto';
// import { UserSerivcePort } from '../domain/inboundPorts/user.domain.service.port';
// import { UserService } from '../domain/inboundPorts/user.domain.service';
import { CommandBus } from '@nestjs/cqrs';

@Controller('users')
export class UserController {
    constructor(private commandBus: CommandBus) {}
    //@Inject(UserService) private readonly userService: UserSerivcePort
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
