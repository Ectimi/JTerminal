import { CommandType } from '../../../command';
import { localforage,clearLocalforage } from '@/lib/localForage';

const logoutCommand: CommandType = {
  func: 'logout',
  name: '退出登陆',
  desc: '退出登陆',
  alias: [],
  params: [],
  options: [],
  async action(options, terminal) {
    const token = await localforage.getItem('token');
    if (token) {
      await clearLocalforage()
      terminal.writeSuccessOutput('已退出登陆');
    } else {
      terminal.writeInfoOutput('当前没有登陆');
    }
  },
};

export default logoutCommand;
