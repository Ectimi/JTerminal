import getopts, { ParsedOptions } from 'getopts';
import { CommandType, CommandOption } from './command';
import { getCommand as getCommandMap } from './commandRegister';
import searchCommand from './commands/search/searchCommand';

const getCommand = async (
  text: string,
  parentCommand?: CommandType
): Promise<CommandType> => {
  const { commandMap } = await getCommandMap();
  let func = text.split(' ', 1)[0];
  // 大小写无关
  func = func.toLowerCase();
  let commands: any = commandMap;
  // 有父命令，则从父命令中查找
  if (
    parentCommand &&
    parentCommand.subCommands &&
    Object.keys(parentCommand.subCommands).length > 0
  ) {
    commands = parentCommand.subCommands;
  }
  const command = commands[func];

  return command;
};

const doParse = (
  text: string,
  commandOptions: CommandOption[]
): getopts.ParsedOptions => {
  // 过滤掉关键词
  const args: string[] = text.split(' ').slice(1);
  // 转换
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: [],
  };
  /**
   * 正常情况下，如果输入的搜索词带有 -/-- 符号，会被getOpts进行参数处理，
   * 从而不能正常搜索，这里为统一为所有搜索命令添加 -i 参数，如果带有 -i，
   * 则让getOpts忽略处理带有-/-- 符号的搜索词，以直接搜索
   */
  const commandName = text.split(' ')[0];
  const allSearchCommandNames: string[] = [];
  const ignoreOption = '-i';
  searchCommand.forEach((command) => {
    allSearchCommandNames.push(command.func);
    if (command.alias) {
      command.alias.forEach((alia) => {
        allSearchCommandNames.push(alia);
      });
    }
  });
  if (allSearchCommandNames.includes(commandName)) {
    if (args.includes(ignoreOption)) {
      args.splice(args.indexOf(ignoreOption), 1);
      args.unshift('--');
    }
  }

  commandOptions.forEach((commandOption) => {
    const { alias, key, type, defaultValue } = commandOption;
    if (alias && options.alias) {
      options.alias[key] = alias;
    }
    options[type]?.push(key);
    if (defaultValue && options.default) {
      options.default[key] = defaultValue;
    }
  });
  const parsedOptions = getopts(args, options);

  return parsedOptions;
};

export const commandExecute = async (
  text: string,
  terminal: JTerminal.TerminalType,
  parentCommand?: CommandType
) => {
  //去除命令首尾空格
  text = text.trim();
  if (!text) {
    return;
  }
  // 解析文本，得到命令
  const command: CommandType = await getCommand(text, parentCommand);
  if (!command) {
    terminal.writeErrorOutput('找不到该命令');
    return;
  }
  // 解析参数（需传递不同的解析规则）
  const parsedOptions = doParse(text, command.options);
  const { _ } = parsedOptions;
  // 有子命令，执行
  if (
    _.length > 0 &&
    command.subCommands &&
    Object.keys(command.subCommands).length > 0
  ) {
    // 把子命令当做新命令解析，user login xxx => login xxx
    const subText = text.substring(text.indexOf(' ') + 1);
    await commandExecute(subText, terminal, command);
    return;
  }
  // 执行命令
  await command.action(parsedOptions, terminal);
};
