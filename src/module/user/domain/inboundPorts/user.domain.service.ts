import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { UserRepositoryImpl } from '../../infrastructure/repository/user.repository';
import { CreateUserReqDto } from '../../interface/dto/request/create-user.req.dto';
import { UserRepositoryPort } from '../outboundPorts/user.repository.port';
import { UserSerivcePort } from './user.domain.service.port';

@Injectable()
export class UserDomainService implements UserSerivcePort {
    constructor(@Inject(UserRepositoryImpl) private userRepository: UserRepositoryPort) {}

    async signUp(createUserReqDto: CreateUserReqDto) {
        const user = await this.userRepository.findOneByEmail(createUserReqDto.email);
        if (user) throw new BadRequestException('중복된 이메일입니다.');

        return await this.userRepository.signUp(createUserReqDto);
    }
}
