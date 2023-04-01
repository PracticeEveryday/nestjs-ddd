import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { UserRepositoryPort } from '../../domain/user/outboundPorts/user.repository.port';
import { UserDomain } from '../../domain/user/user.domain';
import { CreateUserReqDto } from '../../interface/dto/request/create-user.req.dto';
import { UserEntity } from '../entity/user.entity';
import UserMapper from '../mapper/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    public signUp = async (createUserReqDto: CreateUserReqDto, queryRunner: QueryRunner): Promise<UserEntity> => {
        const newUser = new UserEntity();
        newUser.email = createUserReqDto.email;
        newUser.name = createUserReqDto.name;

        await queryRunner.manager.save(newUser);
        return newUser;
    };

    public findOneById = async (userId: number): Promise<UserDomain | null> => {
        const user = await this.userRepository.findOne({ where: { userId } });

        return UserMapper.toOptionalDomain(user);
    };

    public findOneByEmail = async (email: string): Promise<UserDomain | null> => {
        const user = await this.userRepository.findOne({ where: { email } });

        return UserMapper.toOptionalDomain(user);
    };
}
