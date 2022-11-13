import { CommandType } from '../../../command';
import { Register } from '@/serve/api';
import {localforage,LocalForageKeys} from '@/lib/localForage'

const registerCommand: CommandType = {
  func: 'register',
  name: '注册',
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
    try {
      const { username, password } = options;
      if (username && password) {
        const data = await Register({ username, password });
        if (data.success) {
          await localforage.setItem(LocalForageKeys.TOKEN, data.data.token);
          terminal.removeOutput(terminal.getOutputLength.length - 1);
          terminal.writeSuccessOutput('注册成功，请输入 login 命令登录');
        } else {
          terminal.writeErrorOutput(data.message || '注册错误');
        }
      } else if (username && !password) {
        terminal.writeErrorOutput('缺少密码');
      } else if (password && !username) {
        terminal.writeErrorOutput('缺少账号');
      } else {
        const RegisterComponent = await import('./RegisterBox');
        terminal.unfocusInput();
        terminal.writeComponentOutput({
          type: 'component',
          component: RegisterComponent.default,
          componentName: 'registerBox',
        });
      }
    } catch (error: any) {
      const { name, message } = error;
      if (name || message) {
        terminal.writeErrorOutput(`${name}：${message}`);
      } else {
        terminal.writeErrorOutput('注册出错了');
      }
    }
  },
};

export default registerCommand;
