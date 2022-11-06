import { CommandType } from "../../command";

const timeCommand: CommandType = {
  func: "time",
  name: "清屏",
  alias: ['date'],
  params: [],
  options: [],
  async action(options, terminal, parentCommand) {
    const DatetimeComponent = await import('../../../components/Datetime');
    terminal.writeComponentOutput(DatetimeComponent.default);
  },
};

export default timeCommand;
