import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '🔥/src/user/user.module';

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
        forwardRef(() => UserModule),
    ],
    providers: [JwtStrategy, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
