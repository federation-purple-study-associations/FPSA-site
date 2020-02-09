import {interfaces} from "inversify";

import { AgendaService } from './api/agenda.service';

export class ApiServiceBinder {
    public static with(container: interfaces.Container) {
        container.bind<AgendaService>("AgendaService").to(AgendaService).inSingletonScope();
    }
}
