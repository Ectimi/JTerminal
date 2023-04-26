import { CommandType } from '../../command';

const resumeCommand: CommandType = {
  func: 'resume',
  name: '在线简历',
  alias: [],
  params: [],
  options: [],
  action(options, terminal) {
    window.location.href = window.location.href + '#/resume';
  },
};

export default resumeCommand;
