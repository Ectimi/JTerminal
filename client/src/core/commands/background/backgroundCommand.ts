import { CommandType } from '../../command';
import { RandomWallpaper } from '@/serve/api';

const backgroundCommand: CommandType = {
  func: 'background',
  name: '背景图片',
  alias: ['bg'],
  params: [
    {
      key: 'link',
      desc: '图片链接',
      required: false,
    },
  ],
  options: [
    {
      key: 'reset',
      desc: '重置背景',
      alias: ['r'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, reset } = options;
    if(reset){
      terminal.setBackgroundImage('');
      return;
    }
    RandomWallpaper()
      .then((data: any) => {
        terminal.setBackgroundImage(data.data.imgurl);
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  },
};

export default backgroundCommand;
