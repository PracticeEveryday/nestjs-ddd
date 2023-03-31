import { AggregateRoot } from '@nestjs/cqrs';

export type userRequiredProps = Required<{
    readonly email: string;
    readonly name: string;
}>;

export type userOptionalProps = Partial<{
    readonly userId: number;
    readonly address: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
}>;

export type userProps = userRequiredProps & Required<userOptionalProps>;

export interface User {
    properties: () => userProps;
}

export class UserDomain extends AggregateRoot implements User {
    private readonly userId: number;
    private email: string;
    private name: string;
    private address: string;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;
    private readonly deletedAt: Date | null;

    constructor(properties: userRequiredProps & userOptionalProps) {
        super();
        Object.assign(this, properties);
    }

    public properties() {
        return {
            userId: this.userId,
            email: this.email,
            name: this.name,
            address: this.address,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
}
