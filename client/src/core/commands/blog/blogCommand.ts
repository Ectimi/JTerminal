import { CommandType } from '../../command';

const blogCommand: CommandType = {
  func: 'blog',
  name: '个人博客',
  alias: [],
  params: [],
  options: [
    {
      key: 'vercel',
      desc: '以vercel域名打开',
      alias: ['v'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, vercel } = options;
    if (vercel) {
      window.open('https://vercel-blog-seven-gamma.vercel.app/');
    }else{
      window.open('http://124.223.24.47:5502/')
    }
  },
};

export default blogCommand;
