import { Injectable, Module, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordUtils {
    public async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10); // 기본이 10번이고 숫자가 올라갈수록 연산 시간과 보안이 높아진다.
        return await bcrypt.hash(password, salt); // hashed를 데이터베이스에 저장한다.
    }

    public async comparePassword(incomePassword: string, dbPassword: string): Promise<boolean> {
        const validPassword = await bcrypt.compare(incomePassword, dbPassword);
        if (!validPassword) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        return true;
    }
}

@Module({
    providers: [PasswordUtils],
    exports: [PasswordUtils],
})
export class PasswordModule {}
