import { RepositoryPort } from '🔥/libs/ddd/repository.port';
import { CreateUserReqDto } from '🔥/module/user/interface/dto/request/create-user.req.dto';

import { UserDetailDomain } from '../userDetail.domain';

export interface UserDetailRepositoryPort extends RepositoryPort<UserDetailDomain> {
    create(createUserResDto: CreateUserReqDto): Promise<UserDetailDomain>;
}
