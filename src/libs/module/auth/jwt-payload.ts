import { JwtPayload } from 'jsonwebtoken';

export type CustomPayload = JwtPayload & {
    userId: number;
};
