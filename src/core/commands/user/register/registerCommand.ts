import { CommandType } from "../../../command";

const registerCommand: CommandType = {
  func: "register",
  name: "注册",
  alias: [],
  params: [],
  options: [
    {
        key: 'username',
        alias: ['u'],
        desc: '用户名',
        type: 'string',
      },
      {
        key: 'password',
        desc: '密码',
        alias: ['p'],
        type: 'string',
      },
  ],
  async action(options, terminal, parentCommand) {
   console.log(options)
  },
};

export default registerCommand;
