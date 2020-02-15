import {interfaces} from "inversify";

import { AgendaService } from './api/agenda.service';
import { UserService } from './api/user.service';

export class ApiServiceBinder {
    public static with(container: interfaces.Container) {
        container.bind<AgendaService>("AgendaService").to(AgendaService).inSingletonScope();
        container.bind<UserService>("UserService").to(UserService).inSingletonScope();
    }
}
