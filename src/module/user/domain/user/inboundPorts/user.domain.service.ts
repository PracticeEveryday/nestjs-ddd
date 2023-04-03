import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { returnValueToDto } from '🔥/libs/decorators/returnValueToDto.decorator';
import { UserDetailRepositoryImpl } from '🔥/module/user/infrastructure/repository/user-detail.repository';

import { UserSerivcePort } from './user.domain.service.port';
import { UserRepositoryImpl } from '../../../infrastructure/repository/user.repository';
import { CreateUserReqDto } from '../../../interface/dto/request/create-user.req.dto';
import { CreateUserResDto } from '../../../interface/dto/response/create-user.res.dto';
import { UserDetailRepositoryPort } from '../../user-detail/outboundPorts/user.repository.port';
import { UserRepositoryPort } from '../outboundPorts/user.repository.port';

@Injectable()
export class UserDomainService implements UserSerivcePort {
    constructor(
        @Inject(UserRepositoryImpl) private userRepository: UserRepositoryPort,
        @Inject(UserDetailRepositoryImpl) private userDetailRepository: UserDetailRepositoryPort
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
}
