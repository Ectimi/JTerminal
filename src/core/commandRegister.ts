import { CommandType } from "./command";
import searchCommand from "./commands/search/searchCommand";
import helpCommand from "./commands/terminal/help/helpCommand";
import clearCommand from "./commands/terminal/clear/clearCommand";
import timeCommand from "./commands/time/timeCommand";

const commandList:CommandType[] = [
    ...searchCommand,
    helpCommand,
    clearCommand,
    timeCommand
]

const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };