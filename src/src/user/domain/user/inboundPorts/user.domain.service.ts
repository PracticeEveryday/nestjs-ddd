import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { returnValueToDto } from '🔥/libs/decorators/returnValueToDto.decorator';
import { PasswordUtils } from '🔥/libs/module/password/password.module';
import { UserDetailRepositoryImpl } from '🔥/src/user/infrastructure/repository/user-detail.repository';
import { SignInReqDto } from '🔥/src/user/interface/dto/request/sign-in.req.dto';

import { UserSerivcePort } from './user.domain.service.port';
import { UserRepositoryImpl } from '../../../infrastructure/repository/user.repository';
import { CreateUserReqDto } from '../../../interface/dto/request/create-user.req.dto';
import { CreateUserResDto } from '../../../interface/dto/response/create-user.res.dto';
import { UserDetailRepositoryPort } from '../../user-detail/outboundPorts/user.repository.port';
import { UserRepositoryPort } from '../outboundPorts/user.repository.port';

@Injectable()
export class UserDomainService implements UserSerivcePort {
    constructor(
        @Inject(UserRepositoryImpl) private readonly userRepository: UserRepositoryPort,
        @Inject(UserDetailRepositoryImpl) private readonly userDetailRepository: UserDetailRepositoryPort,
        private readonly passwordUtils: PasswordUtils
    ) {}

    @returnValueToDto(CreateUserResDto)
    async signUp(createUserReqDto: CreateUserReqDto) {
        const user = await this.userRepository.findOneByEmail(createUserReqDto.email);
        if (user) throw new BadRequestException('중복된 이메일입니다.');

        const newUser = await this.userRepository.signUp(createUserReqDto);
        if (!newUser) throw new BadRequestException('유저가 정상적으로 생성되지 않았습니다.');

        createUserReqDto.user = newUser;
        await this.userDetailRepository.create(createUserReqDto);

        return newUser;
    }

    // @returnValueToDto(CreateUserResDto)
    async signIn(signInReqDto: SignInReqDto) {
        const user = await this.userRepository.findOneByEmail(signInReqDto.email);
        if (!user) throw new UnauthorizedException('해당 유저가 존재하지 않습니다.');

        const isPassword = await this.passwordUtils.comparePassword(signInReqDto.password, user.properties().password);
        console.log(isPassword);
        return user;
    }
}
