import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { UserBasicDto } from '../user-basic.dto';

export class CreateUserReqDto extends PickType(UserBasicDto, ['email', 'name', 'address'] as const) {
    @ApiProperty({
        example: '자율전공학부',
        description: 'User major',
    })
    @Expose()
    @IsNotEmpty()
    @MaxLength(320)
    readonly major: string;

    @ApiProperty({
        example: '1995-05-10',
        description: 'User 생년월일',
    })
    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(60)
    readonly birth: string | null;
}
