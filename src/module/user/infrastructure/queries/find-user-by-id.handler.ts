import { BadRequestException, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepositoryImpl } from '🔥/module/user/infrastructure/repository/user.repository';
import { UserDomain } from '../../domain/user.domain';

import { FindUserByIdQuery } from './find-user-by-Id.query';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
    constructor(@Inject(UserRepositoryImpl) private userRepository: UserRepositoryImpl) {}

    async execute(query: FindUserByIdQuery): Promise<UserDomain> {
        const user = await this.userRepository.findOneById(query.userId);
        if (!user) throw new BadRequestException('해당 ID의 유저가 없습니다.');

        return user;
    }
}
