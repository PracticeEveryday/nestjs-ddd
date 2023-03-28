import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { CreateUserReqDto } from './dto/create-user.req.dto';
// import { UserSerivcePort } from '../domain/inboundPorts/user.domain.service.port';
// import { UserService } from '../domain/inboundPorts/user.domain.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserIdParamReqDto } from './dto/userId.param.req.dto';
import { FindUserByIdQuery } from '../infrastructure/queries/find-user-by-Id.query';

@Controller('users')
export class UserController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}
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

    @ApiResponse({
        status: HttpStatus.OK,
    })
    @Post('/:userId')
    async findOneById(@Param() param: UserIdParamReqDto) {
        return await this.queryBus.execute(new FindUserByIdQuery(param));
    }
}
