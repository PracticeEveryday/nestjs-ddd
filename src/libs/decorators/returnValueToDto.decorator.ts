import { ClassConstructor, plainToInstance } from 'class-transformer';

export const returnValueToDto = (dto: ClassConstructor<any>) => (_target: any, _key: string, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value;
    console.log(descriptor.value, '여긴 아무 것도 없나?');

    descriptor.value = async function (...args: any[]) {
        const result = await originalMethod.apply(this, args);
        console.log(args, 'args');
        return plainToInstance(dto, result, { excludeExtraneousValues: true });
    };

    return descriptor;
};
