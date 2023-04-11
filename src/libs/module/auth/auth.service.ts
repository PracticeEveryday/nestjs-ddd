import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    public signToken(obj: { userId: number }) {
        return this.jwtService.sign(obj);
    }
}
