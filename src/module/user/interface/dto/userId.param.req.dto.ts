import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserIdParamReqDto {
    @ApiProperty({
        example: 1,
        description: 'User Id',
    })
    @IsNumber()
    readonly userId: number;
}
