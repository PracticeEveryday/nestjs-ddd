import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserReqDto } from './dto/request/create-user.req.dto';
// import { UserSerivcePort } from '../domain/inboundPorts/user.domain.service.port';
// import { UserService } from '../domain/inboundPorts/user.domain.service';
import { UserIdParamReqDto } from './dto/request/userId.param.req.dto';
import { CreateUserResDto } from './dto/response/create-user.res.dto';
import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { FindUserByIdQuery } from '../infrastructure/queries/FindUserByIdQuery';

@Controller('users')
export class UserController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}
    //@Inject(UserService) private readonly userService: UserSerivcePort

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CreateUserResDto,
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
    })
    @Post('/sign-up')
    async create(@Body() createUserReqDto: CreateUserReqDto): Promise<CreateUserResDto> {
        const user = await this.commandBus.execute(new CreateUserCommand(createUserReqDto));
        console.log(user, 'user');
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: CreateUserResDto,
    })
    @Post('/:userId')
    async findOneById(@Param() param: UserIdParamReqDto): Promise<CreateUserResDto> {
        return await this.queryBus.execute(new FindUserByIdQuery(param));
    }
}
