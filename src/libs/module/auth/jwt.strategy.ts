// library
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CustomPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_PRIVATE_KEY'),
        });
    }

    async validate(payload: CustomPayload) {
        const { userId } = payload;
        // const user = this.queryBus.execute(new FindUserByIdQuery({ userId }));

        // if (!user) throw new UnauthorizedException();

        return userId;
    }
}
