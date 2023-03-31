import { UserEntity } from '🔥/module/user/infrastructure/entity/user.entity';

import { CreateUserReqDto } from '../../../interface/dto/request/create-user.req.dto';

export interface UserSerivcePort {
    signUp(createUserReqDto: CreateUserReqDto): Promise<UserEntity>;
}
