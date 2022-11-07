import { CommandType } from '../../../command';

const loginCommand: CommandType = {
  func: 'login',
  name: '登录',
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
    const { username, password } = options;
    if (username && password) {
      console.log('login');
    } else if (username && !password) {
      console.log('no password');
    } else if (password && !username) {
      console.log('no username');
    } else {
      const outputs = terminal.getAllOutput();
      const LoginBoxComponent = await import('../login/LoginBox');
      for (let i = 0; i < outputs.length; i++) {
        const output = outputs[i];
        if (output.type === 'component') {
          if(output.componentName === 'loginBox'){
            terminal.removeOutput(i)
            break;
          }
        }
      }
      terminal.unfocusInput();
      terminal.writeComponentOutput({
        type: 'component',
        component: LoginBoxComponent.default,
        componentName: 'loginBox',
        onlyOne: true,
      });
    }
    console.log(options);
  },
};

export default loginCommand;
