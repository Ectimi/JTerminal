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
      name: 'self',
      alias: ['s'],
      require: false,
    },
  ],
  actions(options, terminal) {
    console.log('add bookmark');
  },
};

export default baiduCommand;
