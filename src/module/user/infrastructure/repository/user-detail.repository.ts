import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserInjectionToken } from './injectionToken';
import { UserDetailRepositoryPort } from '../../domain/user-detail/outboundPorts/user.repository.port';
import { UserDetailDomain } from '../../domain/user-detail/userDetail.domain';
import { CreateUserReqDto } from '../../interface/dto/request/create-user.req.dto';
import { UserDetailEntity } from '../entity/user-detail.entity';
import UserDetailMapper from '../mapper/user-detail.mapper';

@Injectable()
export class UserDetailRepositoryImpl implements UserDetailRepositoryPort {
    constructor(
        @Inject(UserInjectionToken.USER_DETAIL_REPOSITORY)
        private userRepository: Repository<UserDetailEntity>
    ) {}

    public create = async (createUserReqDto: CreateUserReqDto): Promise<UserDetailDomain> => {
        const newUserDetail = new UserDetailEntity();
        newUserDetail.major = createUserReqDto.major;
        newUserDetail.birth = createUserReqDto.birth;

        await this.userRepository.save(newUserDetail);
        return UserDetailMapper.toRequiredDomain(newUserDetail);
    };
}
