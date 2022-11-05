import { CommandType } from '../../command';

const baiduCommand: CommandType = {
  func: 'baidu',
  name: '百度',
  desc: '百度搜索',
  alias: ['bd'],
  params: [
    {
      key: 'keyword',
      desc: '搜索关键词',
      required: true,
    },
  ],
  options: [
    {
      key: 'self',
      alias: ['s'],
      desc: '是否在当前页面打开',
      type: 'boolean',
      defaultValue: false,
    },
    {
      key: 'picture',
      desc: '是否搜索图片',
      alias: ['p'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    console.log('add bookmark');
  },
};

export default baiduCommand;
