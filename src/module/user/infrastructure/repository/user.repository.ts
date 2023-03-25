import { Injectable, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { CreateUserReqDto } from '../../interface/dto/create-user.request.dto';

import { UserEntity } from '../entity/user.entity';
import { UserInjectionToken } from './injectionToken';

import { UserRepositoryPort } from './user.repository.port';

@Injectable()
export class UserRepositoryImpl implements UserRepositoryPort {
    constructor(
        @Inject(UserInjectionToken.USER_REPOSITORY)
        private userRepository: Repository<UserEntity>
    ) {}

    public signUp = async (createUserReqDto: CreateUserReqDto): Promise<UserEntity> => {
        const newUser = new UserEntity();
        newUser.email = createUserReqDto.email;
        newUser.name = createUserReqDto.name;

        await this.userRepository.save(newUser);
        return newUser;
    };

    public findOneById = async (userId: number): Promise<UserEntity | null> => {
        return await this.userRepository.findOne({ where: { userId } });
    };

    public findOneByEmail = async (email: string): Promise<UserEntity | null> => {
        return await this.userRepository.findOne({ where: { email } });
    };
}
