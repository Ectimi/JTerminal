import { CommandType } from "../../../command";

const clearCommand: CommandType = {
  func: "clear",
  name: "清屏",
  desc:'清屏',
  alias: [],
  params: [],
  options: [],
  async action(options, terminal, parentCommand) {
   terminal.clear()
  },
};

export default clearCommand;
