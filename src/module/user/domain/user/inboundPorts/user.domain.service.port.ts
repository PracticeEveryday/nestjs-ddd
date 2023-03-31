import { CreateUserReqDto } from '../../../interface/dto/request/create-user.req.dto';
import { UserDomain } from '../user.domain';

export interface UserSerivcePort {
    signUp(createUserReqDto: CreateUserReqDto): Promise<UserDomain>;
}
