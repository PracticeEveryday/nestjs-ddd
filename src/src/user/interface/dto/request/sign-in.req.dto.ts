import { PickType } from '@nestjs/swagger';

import { UserBasicDto } from '../user-basic.dto';

export class SignInReqDto extends PickType(UserBasicDto, ['email', 'password'] as const) {}
