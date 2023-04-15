import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '🔥/src/user/infrastructure/entity/user.entity';
import { UserRepositoryImpl } from '🔥/src/user/infrastructure/repository/user.repository';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                privateKey: configService.getOrThrow<string>('JWT_PRIVATE_KEY'),
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [JwtStrategy, AuthService, UserRepositoryImpl],
    exports: [AuthService],
})
export class AuthModule {}
