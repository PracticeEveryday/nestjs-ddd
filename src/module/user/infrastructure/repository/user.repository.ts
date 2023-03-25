import { Injectable, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { CreateUserReqDto } from '../../interface/dto/create-user.request.dto';

import { UserEntity } from '../entity/user.entity';
import { UserInjectionToken } from './injectionToken';

import { UserRepositoryPort } from '../../domain/outboundPorts/user.repository.port';
import UserMapper from '../mapper/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepositoryPort {
    constructor(
        @Inject(UserInjectionToken.USER_REPOSITORY)
        private userRepository: Repository<UserEntity>
    ) {}

    public signUp = async (createUserReqDto: CreateUserReqDto) => {
        const newUser = new UserEntity();
        newUser.email = createUserReqDto.email;
        newUser.name = createUserReqDto.name;

        await this.userRepository.save(newUser);
        return UserMapper.toRequiredDomain(newUser);
    };

    public findOneById = async (userId: number) => {
        const user = await this.userRepository.findOne({ where: { userId } });
        return UserMapper.toOptionalDomain(user);
    };

    public findOneByEmail = async (email: string) => {
        const user = await this.userRepository.findOne({ where: { email } });

        return UserMapper.toOptionalDomain(user);
    };
}
