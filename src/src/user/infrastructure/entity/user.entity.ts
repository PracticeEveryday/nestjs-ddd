import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '🔥/libs/module/database/base.entity';

import { UserDetailEntity } from './user-detail.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @ApiProperty({ example: 'test@test.com', required: true })
    @Column({ length: 50, nullable: false, default: '', comment: '유저 이메일', unique: true })
    email: string;

    @ApiProperty({ example: '김동현', required: true })
    @Column({ length: 20, nullable: false, default: '', comment: '유저 이름' })
    name: string;

    @ApiProperty({ example: '$2b$10$WKGdkvLTEDBm51HL2b0MlezcsVir7X2lJ0dU1uInkHFjgc1bbGB6C', required: true })
    @Column({ length: 255, nullable: false, default: '', comment: '비밀번호' })
    password: string;

    @ApiProperty({ example: '관악구 신림동' })
    @Column({ type: 'varchar', length: 20, nullable: true, default: '', comment: '주소' })
    address: string | null;

    @OneToOne(() => UserDetailEntity)
    userDetail: UserDetailEntity;
}
