import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
@Injectable()
export class AuthService {
    private secretKey: string;
    constructor(configService: ConfigService, private readonly jwtService: JwtService) {
        this.secretKey = configService.getOrThrow<string>('JWT_PRIVATE_KEY');
    }

    public signToken(obj: { userId: number }) {
        return this.jwtService.sign(obj);
    }

    public validateToken = (token: string) => {
        try {
            const verify = this.jwtService.verify(token, { secret: this.secretKey });

            return verify;
        } catch (error: unknown) {
            if (error instanceof JsonWebTokenError) {
                console.log('message: ', error.message);
                switch (error.message) {
                    // 토큰에 대한 오류를 판단합니다.
                    case 'invalid signature':
                        throw new HttpException(`유효하지 않은 토큰입니다.: ${error.message}`, 401);
                    case 'jwt malformed':
                        throw new HttpException(`유효하지 않은 토큰입니다.: ${error.message}`, 401);
                    case 'jwt expired':
                        throw new HttpException(`토큰이 만료되었습니다.: ${error.message}`, 410);
                    default:
                        throw new HttpException(`서버 오류입니다.: ${error.message}`, 500);
                }
            }
        }
    };
}
