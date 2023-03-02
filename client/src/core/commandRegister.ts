import { localforage, LocalForageKeys } from '@/lib/localForage';
import { IUser } from '@/store';
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
import pingCommand from './commands/ping/pingCommand';
import resumeCommand from './commands/resume/resumeCommand';
import codeCommand from './commands/code/codeCommand';
import blogCommand from './commands/blog/blogCommand';

const getCommand = async (): Promise<{
  commandList: CommandType[];
  commandMap: Record<string, CommandType>;
}> => {
  const user = (await localforage.getItem(LocalForageKeys.USER)) as IUser;

  const commandList: CommandType[] = [
    ...searchCommand,
    helpCommand,
    clearCommand,
    datetimeCommand,
    gotoCommand,
    loginCommand,
    logoutCommand,
    registerCommand,
    bookmarkCommand,
    pingCommand,
    resumeCommand,
  ];

  const specificCommandList = [codeCommand, blogCommand];

  if (user && user.username === 'J') {
    commandList.push(...specificCommandList);
  }

  const commandMap: Record<string, CommandType> = {};

  commandList.forEach((command) => {
    commandMap[command.func] = command;
    command.alias?.forEach((name) => {
      commandMap[name] = command;
    });
  });

  return { commandList, commandMap };
};

export { getCommand };
