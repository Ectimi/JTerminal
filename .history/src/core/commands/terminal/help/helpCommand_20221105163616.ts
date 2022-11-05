import { CommandType } from '../../../command';
import { commandList,commandMap } from '../../../commandRegister';

const helpCommand: CommandType = {
  func: 'help',
  name: '查看命令帮助',
  alias: [],
  params: [
    {
      key: 'commandName',
      desc: '命令英文名称',
      required: false,
    },
  ],
  options: [],
  async action(options, terminal,parentCommand) {
    const { _ } = options;
    if (_.length === 0) {
      const HelpComponent = await import('./help');
      terminal.writeComponentOutput(HelpComponent.default());
      return;
    }
    const commandName = _[0]
    let commands:any = commandMap;
    // 支持输出子命令的帮助
    if (
      parentCommand &&
      parentCommand.subCommands &&
      Object.keys(parentCommand.subCommands).length > 0
    ) {
      commands = parentCommand.subCommands;
    }
    const command = commands[commandName];
    if (!command) {
      terminal.writeErrorOutput("找不到指定命令");
      return;
    }
    const HelpComponent = await import('./help');
  },
};

export default helpCommand;
