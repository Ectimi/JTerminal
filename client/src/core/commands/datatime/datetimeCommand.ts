import { CommandType } from "../../command";

const datetimeCommand: CommandType = {
  func: "datetime",
  name: "清屏",
  desc:'获取当前时间',
  alias: ['date','time'],
  params: [],
  options: [],
  async action(options, terminal, parentCommand) {
    const DatetimeComponent = await import('../../../components/Datetime');
    terminal.writeComponentOutput({
      type:'component',
      component:DatetimeComponent.default,
      componentName:'datetime'
    });
  },
};

export default datetimeCommand;
