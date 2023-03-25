import { RepositoryPort } from '🔥/libs/ddd/repository.port';
import { CreateUserReqDto } from '../../interface/dto/create-user.request.dto';

import { UserEntity } from '../entity/user.entity';

// export interface FindUsersParams extends PaginatedQueryParams {
//     readonly country?: string;
//     readonly postalCode?: string;
//     readonly street?: string;
// }

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
    findOneByEmail(email: string): Promise<UserEntity | null>;
    signUp(createUserResDto: CreateUserReqDto): Promise<UserEntity>;
    findOneById(userId: number): Promise<UserEntity | null>;
}
