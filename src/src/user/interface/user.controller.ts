import { Body, Controller, Get, HttpStatus, Inject, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { EntityManager } from 'typeorm';

import { ReqUser } from '🔥/libs/decorators/req-user.decorator';
import { TransactionManager } from '🔥/libs/decorators/transaction.decorator';
import { CustomAuthGuard } from '🔥/libs/guards/custom-auth.guard';
import { TransactionInterceptor } from '🔥/libs/interceptors/transaction.interceptor';

import { CreateUserReqDto } from './dto/request/create-user.req.dto';
import { SignInReqDto } from './dto/request/sign-in.req.dto';
import { UserIdParamReqDto } from './dto/request/userId.param.req.dto';
import { CreateUserResDto } from './dto/response/create-user.res.dto';
import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { SignInCommand } from '../application/commands/sign-in/sign-in.command';
import { User } from '../domain/user/user.domain';
import { FindUserByIdQuery } from '../infrastructure/queries/FindUserByIdQuery';

@ApiTags('User API')
@Controller('users')
export class UserController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger
    ) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    async getProfile(@ReqUser() user: User) {
        return user;
    }

    @ApiOperation({ summary: '유저 생성 API' })
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
    @UseInterceptors(TransactionInterceptor)
    public async create(
        @Body() createUserReqDto: CreateUserReqDto,
        @TransactionManager() queryRunnerManager: EntityManager
    ): Promise<CreateUserResDto> {
        this.logger.log('info', 'Create User');

        createUserReqDto.queryRunnerManager = queryRunnerManager;
        const user = await this.commandBus.execute(new CreateUserCommand(createUserReqDto));
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: CreateUserResDto,
    })
    @Post('/signIn')
    @ApiOperation({ summary: '유저 로그인 API' })
    public async signIn(@Body() signInReqDto: SignInReqDto): Promise<CreateUserResDto> {
        this.logger.log('info', `signIn email: ${signInReqDto.email}`);

        return await this.commandBus.execute(new SignInCommand(signInReqDto));
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: CreateUserResDto,
    })
    @Post('/:userId')
    @ApiOperation({ summary: '유저 상세 조회 API' })
    public async findOneById(@Param() param: UserIdParamReqDto): Promise<CreateUserResDto> {
        this.logger.log('info', `findOneById userId: ${param.userId}`);

        return await this.queryBus.execute(new FindUserByIdQuery(param));
    }
}
