import {interfaces} from "inversify";

import { AgendaService } from './api/agenda.service';
import { BoardService } from './api/board.service';
import { StatisticService } from './api/statistic.service';
import { UserService } from './api/user.service';

export class ApiServiceBinder {
    public static with(container: interfaces.Container) {
        container.bind<AgendaService>("AgendaService").to(AgendaService).inSingletonScope();
        container.bind<BoardService>("BoardService").to(BoardService).inSingletonScope();
        container.bind<StatisticService>("StatisticService").to(StatisticService).inSingletonScope();
        container.bind<UserService>("UserService").to(UserService).inSingletonScope();
    }
}
