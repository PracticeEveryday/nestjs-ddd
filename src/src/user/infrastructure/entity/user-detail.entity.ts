import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '🔥/libs/module/database/base.entity';

import { UserEntity } from './user.entity';

@Entity('user_details')
export class UserDetailEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    userDetailId: number;

    @ApiProperty({ example: '자율전공학부', required: true })
    @Column({ length: 50, nullable: false, default: '', comment: '유저 전공' })
    major: string;

    @ApiProperty({ example: '1995-05-10' })
    @Column({ type: 'varchar', length: 50, nullable: true, default: '', comment: '생년월일' })
    birth: string | null;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;
}
