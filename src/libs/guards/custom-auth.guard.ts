import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../module/auth/auth.service';

// import { User } from '🔥/src/user/domain/user/user.domain';

@Injectable()
export class CustomAuthGuard extends AuthGuard(['jwt']) {
    constructor(private authService: AuthService) {
        super();
    }

    override canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;

        if (authorization === undefined) {
            throw new UnauthorizedException('Token 전송 안됨');
        }

        const token = authorization.replace('Bearer ', '');

        this.authService.validateToken(token);

        return super.canActivate(context);
    }

    override handleRequest(err: unknown, user: any) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        return user;
    }
}
