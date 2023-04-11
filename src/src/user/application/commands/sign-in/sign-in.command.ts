// import { Command, CommandProps } from '🔥/libs/ddd/command.base';
import { ICommand } from '@nestjs/cqrs';

class Properties {
    readonly email: string;
    password: string;
}

export class SignInCommand extends Properties implements ICommand {
    constructor(props: Properties) {
        super();
        Object.assign(this, props);
    }
}
