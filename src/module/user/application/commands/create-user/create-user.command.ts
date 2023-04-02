// import { Command, CommandProps } from '🔥/libs/ddd/command.base';
import { ICommand } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';

class Properties {
    readonly email: string;
    readonly name: string;
    readonly address: string | null;
    readonly major: string;
    readonly birth: string | null;
    readonly queryRunnerManager: EntityManager;
}

export class CreateUserCommand extends Properties implements ICommand {
    constructor(props: Properties) {
        super();
        Object.assign(this, props);
    }
}
