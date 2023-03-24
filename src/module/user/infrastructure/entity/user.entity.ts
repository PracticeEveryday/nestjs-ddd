import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
