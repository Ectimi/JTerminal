import { CommandType } from "./command";
import searchCommand from "./commands/search/searchCommand";
import helpCommand from "./commands/terminal/help/helpCommand";
import clearCommand from "./commands/terminal/clear/clearCommand";
import datetimeCommand from "./commands/datatime/datetimeCommand";
import loginCommand from "./commands/user/login/loginCommand";
import registerCommand from "./commands/user/register/registerCommand";

const commandList:CommandType[] = [
    ...searchCommand,
    helpCommand,
    clearCommand,
    datetimeCommand,
    loginCommand,
    registerCommand
]

const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };