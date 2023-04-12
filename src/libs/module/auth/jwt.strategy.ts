// library
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { FindUserByIdQuery } from '🔥/src/user/infrastructure/queries/FindUserByIdQuery';

import { CustomPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private queryBus: QueryBus) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_PRIVATE_KEY'),
        });
    }

    async validate(payload: CustomPayload) {
        const { userId } = payload;
        const user = this.queryBus.execute(new FindUserByIdQuery({ userId }));

        if (!user) throw new UnauthorizedException();

        return user;
    }
}
