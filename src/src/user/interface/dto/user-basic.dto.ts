import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserBasicDto {
    @ApiProperty({
        example: 'test@test.com',
        description: 'User email address',
    })
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(320)
    readonly email: string;

    @ApiProperty({
        example: 'kim',
        description: 'User name',
    })
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    readonly name: string;

    @ApiProperty({
        example: '12345678a',
        description: 'User password',
    })
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    password: string;

    @ApiProperty({
        example: '신림동 관악구',
        description: '유저 주소',
    })
    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(60)
    readonly address: string | null;

    @ApiProperty({
        example: '2023-03-28 15:13:15.840',
        description: '유저 생성 시간',
    })
    @Expose()
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty({
        example: '2023-03-28 15:13:15.840',
        description: '유저 수정 시간',
    })
    @Expose()
    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @ApiProperty({
        example: '2023-03-28 15:13:15.840 | null',
        description: '유저 삭제 시간',
    })
    @Expose()
    @IsDate()
    @IsOptional()
    deletedAt: Date;
}
