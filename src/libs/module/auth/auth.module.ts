import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                privateKey: configService.get<string>('JWT_PRIVATE_KEY') || 'alkdfj',
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtStrategy, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
