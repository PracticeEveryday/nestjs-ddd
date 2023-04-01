import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

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
        @Inject(UserDetailRepositoryImpl) private userDetailRepository: UserDetailRepositoryPort,
        private readonly datasource: DataSource
    ) {}

    @returnValueToDto(CreateUserResDto)
    async signUp(createUserReqDto: CreateUserReqDto) {
        const user = await this.userRepository.findOneByEmail(createUserReqDto.email);
        if (user) throw new BadRequestException('중복된 이메일입니다.');

        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const newUser = await this.userRepository.signUp(createUserReqDto, queryRunner);
            await this.userDetailRepository.create(createUserReqDto, newUser, queryRunner);

            await queryRunner.commitTransaction();
            return newUser;
        } catch (err: unknown) {
            await queryRunner.rollbackTransaction();
            if (err instanceof Error) {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('err.message', HttpStatus.BAD_REQUEST);
        } finally {
            await queryRunner.release();
        }
    }
}
