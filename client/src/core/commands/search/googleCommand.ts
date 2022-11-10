import { CommandType } from '../../command';

const baiduCommand: CommandType = {
  func: 'google',
  name: 'Google 搜索',
  alias: ['gg'],
  params: [
    {
      key: 'keyword',
      desc: '搜索内容',
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
  ],
  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ?  _.join(' '): '';
    const targetLink = `https://www.google.com/search?q=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default baiduCommand;
