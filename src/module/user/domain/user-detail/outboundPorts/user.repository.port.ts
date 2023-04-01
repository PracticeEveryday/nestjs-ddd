import { QueryRunner } from 'typeorm';

import { RepositoryPort } from '🔥/libs/ddd/repository.port';
import { UserEntity } from '🔥/module/user/infrastructure/entity/user.entity';
import { CreateUserReqDto } from '🔥/module/user/interface/dto/request/create-user.req.dto';

import { UserDetailDomain } from '../userDetail.domain';

export interface UserDetailRepositoryPort extends RepositoryPort<UserDetailDomain> {
    create(createUserResDto: CreateUserReqDto, user: UserEntity, queryRunner: QueryRunner): Promise<UserDetailDomain>;
}
