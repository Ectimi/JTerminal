import { CommandType } from '../../command';

const npmCommand: CommandType = {
  func: 'npm',
  name: 'npm搜索',
  alias: [],
  params: [
    {
      key: 'word',
      desc: '搜索内容',
      required: true,
    },
  ],
  options: [
    {
      key: 'self',
      desc: '是否当前页面打开',
      alias: ['s'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ? _.join(' ') : '';
    const targetLink = `https://www.npmjs.com/search?q=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default npmCommand;
