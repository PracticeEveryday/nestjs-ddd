// import { Command, CommandProps } from '🔥/libs/ddd/command.base';
import { ICommand } from '@nestjs/cqrs';

class Properties {
    readonly email: string;
    readonly name: string;
    readonly address: string | null;
    readonly major: string;
    readonly birth: string | null;
}

export class CreateUserCommand extends Properties implements ICommand {
    constructor(props: Properties) {
        super();
        Object.assign(this, props);
    }
}
