import { CommandType } from './command';
import searchCommand from './commands/search/searchCommand';
import helpCommand from './commands/terminal/help/helpCommand';
import clearCommand from './commands/terminal/clear/clearCommand';
import datetimeCommand from './commands/datatime/datetimeCommand';
import gotoCommand from './commands/goto/gotoCommand';
import loginCommand from './commands/user/login/loginCommand';
import logoutCommand from './commands/user/logout/logoutCommand';
import registerCommand from './commands/user/register/registerCommand';
import bookmarkCommand from './commands/bookmark/bookmarkCommand';

const commandList: CommandType[] = [
  ...searchCommand,
  helpCommand,
  clearCommand,
  datetimeCommand,
  gotoCommand,
  loginCommand,
  logoutCommand,
  registerCommand,
  bookmarkCommand
];

const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
