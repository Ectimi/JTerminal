import { CommandType } from '../../../command';
import { Login } from '@/serve/user';
import {
  localforage,
  addUserBookmarks,
  addUserLabels,
} from '@/lib/localForage';

const loginCommand: CommandType = {
  func: 'login',
  name: '登陆',
  alias: [],
  params: [],
  options: [
    {
      key: 'username',
      alias: ['u'],
      desc: '用户名',
      type: 'string',
      required: true,
    },
    {
      key: 'password',
      desc: '密码',
      alias: ['p'],
      type: 'string',
      required: true,
    },
  ],
  async action(options, terminal, parentCommand) {
    try {
      const { username, password } = options;
      if (username && password) {
        const data = await Login({ username, password });
        if (data.success) {
          terminal.removeOutput(terminal.getOutputLength.length - 1);
          terminal.writeSuccessOutput('登陆成功');
          await localforage.setItem('token', data.data.token);
          await localforage.setItem('user', data.data.user);
          await addUserBookmarks();
          await addUserLabels();
          terminal.setState()
        } else {
          terminal.writeErrorOutput(data.message || '登陆错误');
        }
      } else if (username && !password) {
        terminal.writeErrorOutput('请输入密码');
      } else if (password && !username) {
        terminal.writeErrorOutput('请输入账号');
      } else {
        const LoginBoxComponent = await import('./LoginBox');
        terminal.unfocusInput();
        terminal.writeComponentOutput({
          type: 'component',
          component: LoginBoxComponent.default,
          componentName: 'loginBox',
          onlyOne: true,
        });
      }
    } catch (error: any) {
      const { name, message } = error;
      if (name || message) {
        terminal.writeErrorOutput(`${name}：${message}`);
      } else {
        terminal.writeErrorOutput('登陆出错了');
      }
    }
  },
};

export default loginCommand;
