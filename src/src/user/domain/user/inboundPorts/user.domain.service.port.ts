import { UserEntity } from '🔥/src/user/infrastructure/entity/user.entity';
import { SignInReqDto } from '🔥/src/user/interface/dto/request/sign-in.req.dto';

import { CreateUserReqDto } from '../../../interface/dto/request/create-user.req.dto';
import { UserDomain } from '../user.domain';

export interface UserSerivcePort {
    signUp(createUserReqDto: CreateUserReqDto): Promise<UserEntity>;
    signIn(signInReqDto: SignInReqDto): Promise<UserDomain>;
}
