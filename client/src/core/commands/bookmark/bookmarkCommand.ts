import { CommandType } from '../../command';
import BookmarkComponent from './BookmarkBox';

const bookmarkCommand: CommandType = {
  func: 'bookmark',
  name: '查看书签',
  desc: '查看书签',
  alias: ['list'],
  params: [
    {
      key: 'subCommand',
      desc: '子命令',
      required: false,
    },
  ],
  options: [],
  async action(options, terminal) {
    terminal.writeComponentToViewport({
      type: 'component',
      component: BookmarkComponent,
      componentName: 'bookmarkList',
      onlyOne: true,
    });
  },
};

export default bookmarkCommand;
