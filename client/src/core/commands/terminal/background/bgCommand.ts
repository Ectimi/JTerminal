import { CommandType } from '../../../command';

const clearCommand: CommandType = {
  func: 'background',
  name: '切换背景',
  desc: '切换背景',
  alias: ['bg'],
  params: [
    {
      key: 'url',
      desc: '背景链接',
      required: false,
    },
  ],
  options: [],
  async action(options, terminal, parentCommand) {
    const { _ } = options;
    if (_.length === 0) {
        return
    }
    const url = _[0]
    if(url){
        
    }
  },
};

export default clearCommand;
