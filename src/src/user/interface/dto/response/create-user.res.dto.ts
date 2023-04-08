import { PickType } from '@nestjs/swagger';

import { UserBasicDto } from '../user-basic.dto';

export class CreateUserResDto extends PickType(UserBasicDto, [
    'email',
    'name',
    'address',
    'createdAt',
    'updatedAt',
    'deletedAt',
] as const) {}
