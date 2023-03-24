import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserReqDto {
    @ApiProperty({
        example: 'test@test.com',
        description: 'User email address',
    })
    @MaxLength(320)
    @MinLength(5)
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: 'kim',
        description: 'User name',
    })
    @MaxLength(60)
    @MinLength(5)
    @IsString()
    readonly name: string;
}
