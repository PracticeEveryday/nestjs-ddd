import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const returnValueToDto = (dto: ClassConstructor<any>) => (_target: any, _key: string, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const result = await originalMethod.apply(this, args);
        const object = plainToInstance(dto, result, { excludeExtraneousValues: true });

        const errors = await validate(object);
        if (errors.length > 0) {
            console.log(errors);

            throw new BadRequestException('유효성 검사에 실패하였습니다.');
        }

        return object;
    };

    return descriptor;
};
