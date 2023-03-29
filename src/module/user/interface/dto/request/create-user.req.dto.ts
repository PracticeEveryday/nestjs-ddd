import { PickType } from '@nestjs/swagger';

import { UserBasicDto } from '../user-basic.dto';

export class CreateUserReqDto extends PickType(UserBasicDto, ['email', 'name', 'address'] as const) {}
