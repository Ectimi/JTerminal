import { CommandType } from '../../command';

const blogCommand: CommandType = {
  func: 'blog',
  name: '个人博客',
  alias: [],
  params: [],
  options: [],
  action(options, terminal) {
    window.location.href = 'https://vercel-blog-seven-gamma.vercel.app/';
  },
};

export default blogCommand;
