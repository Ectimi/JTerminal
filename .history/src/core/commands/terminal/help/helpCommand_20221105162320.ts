import { CommandType } from '../../../command';
import { commandList } from '../../../commandRegister';

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
  async action(options, terminal) {
    const HelpComponent = await import('./help');
    terminal.writeComponentOutput(HelpComponent.default({ commandList }));
  },
};

export default helpCommand;
