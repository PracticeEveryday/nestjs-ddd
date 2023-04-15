// library
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepositoryImpl } from '🔥/src/user/infrastructure/repository/user.repository';

import { CustomPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private readonly userRepository: UserRepositoryImpl) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_PRIVATE_KEY'),
        });
    }

    async validate(payload: CustomPayload) {
        const { userId } = payload;
        const user = this.userRepository.findOneById(userId);

        if (!user) throw new UnauthorizedException('해당 유저가 존재하지 않습니다.');

        return user;
    }
}
