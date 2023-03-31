import { RepositoryPort } from '🔥/libs/ddd/repository.port';

import { CreateUserReqDto } from '../../../interface/dto/request/create-user.req.dto';
import { UserDomain } from '../user.domain';

export interface UserRepositoryPort extends RepositoryPort<UserDomain> {
    findOneByEmail(email: string): Promise<UserDomain | null>;
    signUp(createUserResDto: CreateUserReqDto): Promise<UserDomain>;
    findOneById(userId: number): Promise<UserDomain | null>;
}
