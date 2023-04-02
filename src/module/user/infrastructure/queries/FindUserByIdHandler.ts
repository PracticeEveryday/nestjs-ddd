import { BadRequestException, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { returnValueToDto } from '🔥/libs/decorators/returnValueToDto.decorator';
import { UserRepositoryImpl } from '🔥/module/user/infrastructure/repository/user.repository';

import { FindUserByIdQuery } from './FindUserByIdQuery';
import { UserRepositoryPort } from '../../domain/user/outboundPorts/user.repository.port';
import { UserDomain } from '../../domain/user/user.domain';
import { UserBasicDto } from '../../interface/dto/user-basic.dto';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
    constructor(@Inject(UserRepositoryImpl) private userRepository: UserRepositoryPort) {}

    @returnValueToDto(UserBasicDto)
    async execute(query: FindUserByIdQuery): Promise<UserDomain> {
        const user = await this.userRepository.findOneById(query.userId);
        if (!user) throw new BadRequestException('해당 ID의 유저가 없습니다.');

        return user;
    }
}
