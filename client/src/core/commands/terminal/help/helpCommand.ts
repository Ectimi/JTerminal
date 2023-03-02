import { CommandType } from '../../../command';
import { getCommand } from '../../../commandRegister';

const helpCommand: CommandType = {
  func: 'help',
  name: '查看命令帮助',
  desc: '获取命令帮助',
  alias: [],
  params: [
    {
      key: 'commandName',
      desc: '命令英文名称',
      required: false,
    },
  ],
  options: [],
  async action(options, terminal, parentCommand) {
    const { _ } = options;
    const { commandMap } = await getCommand();
    if (_.length === 0) {
      const HelpComponent = await import('./HelpBox');
      terminal.writeComponentOutput({
        type: 'component',
        component: HelpComponent.default,
        componentName: 'helpBox',
      });
      return;
    }
    const commandName = _[0];
    let commands: any = commandMap;
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
      terminal.writeErrorOutput('找不到指定命令');
      return;
    }
    const CommandHelpComponent = await import('./CommandHelpBox');
    terminal.writeComponentOutput({
      type: 'component',
      component: CommandHelpComponent.default({
        command: command as CommandType,
        parentCommand,
      }),
      componentName: 'commandHelp',
    });
  },
};

export default helpCommand;
