import { CommandType } from "./command";
import searchCommand from "./commands/search/searchCommand";

const commandList:CommandType[] = [
    ...searchCommand
]

const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };