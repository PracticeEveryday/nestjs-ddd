import { IQuery } from '@nestjs/cqrs';

class Properties {
    readonly userId: number;
}

export class FindUserByIdQuery extends Properties implements IQuery {
    constructor(props: Properties) {
        super();
        Object.assign(this, props);
    }
}
