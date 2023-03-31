import { AggregateRoot } from '@nestjs/cqrs';

export type userDetailRequiredProps = Required<{
    major: string;
}>;

export type userDetailOptionalProps = Partial<{
    readonly userDetailId: number;
    readonly birth: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
}>;

export type userDetailProps = userDetailRequiredProps & Required<userDetailOptionalProps>;

export interface UserDetail {
    properties: () => userDetailProps;
}

export class UserDetailDomain extends AggregateRoot implements UserDetail {
    private readonly userDetailId: number;
    private major: string;
    private birth: string | null;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;
    private readonly deletedAt: Date | null;

    constructor(properties: userDetailRequiredProps & userDetailOptionalProps) {
        super();
        Object.assign(this, properties);
    }

    public properties() {
        return {
            userDetailId: this.userDetailId,
            major: this.major,
            birth: this.birth,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
}
