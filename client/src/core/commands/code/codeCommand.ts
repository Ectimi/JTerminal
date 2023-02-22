import { CommandType } from '../../command';

const codeCommand: CommandType = {
  func: 'code',
  name: 'code-server',
  alias: [],
  params: [],
  options: [],
  action(options, terminal) {
    window.open('http://124.223.24.47:5500/')
  },
};

export default codeCommand;
