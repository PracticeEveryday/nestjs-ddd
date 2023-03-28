import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserBasicDto {
    @ApiProperty({
        example: 'test@test.com',
        description: 'User email address',
    })
    @IsEmail()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(320)
    @Expose()
    readonly email: string;

    @ApiProperty({
        example: 'kim',
        description: 'User name',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    @Expose()
    readonly name: string;

    @ApiProperty({
        example: '신림동 관악구',
        description: '유저 주소',
    })
    @IsString()
    @IsOptional()
    @MaxLength(60)
    @Expose()
    readonly address?: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        example: '2023-03-28 15:13:15.840',
        description: '유저 생성 시간',
    })
    @Expose()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @ApiProperty({
        example: '2023-03-28 15:13:15.840',
        description: '유저 수정 시간',
    })
    @Expose()
    updatedAt: Date;

    @IsDate()
    @IsOptional()
    @ApiProperty({
        example: '2023-03-28 15:13:15.840 | null',
        description: '유저 삭제 시간',
    })
    @Expose()
    deletedAt: Date;
}
