import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserDetailRepositoryPort } from '../../domain/user-detail/outboundPorts/user.repository.port';
import { UserDetailDomain } from '../../domain/user-detail/userDetail.domain';
import { CreateUserReqDto } from '../../interface/dto/request/create-user.req.dto';
import { UserDetailEntity } from '../entity/user-detail.entity';
import { UserEntity } from '../entity/user.entity';
import UserDetailMapper from '../mapper/user-detail.mapper';

@Injectable()
export class UserDetailRepositoryImpl implements UserDetailRepositoryPort {
    constructor() {
        //
    }
    public create = async (
        createUserReqDto: CreateUserReqDto,
        user: UserEntity,
        entityManager: EntityManager
    ): Promise<UserDetailDomain> => {
        const newUserDetail = new UserDetailEntity();
        newUserDetail.major = createUserReqDto.major;
        newUserDetail.birth = createUserReqDto.birth;
        newUserDetail.user = user;

        await entityManager.getRepository(UserDetailEntity).save(newUserDetail);
        return UserDetailMapper.toRequiredDomain(newUserDetail);
    };
}
