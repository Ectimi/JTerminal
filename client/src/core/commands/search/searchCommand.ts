import { CommandType } from '../../command';
import baiduCommand from './baiduCommand';
import baidudevCommand from './baidudevCommand';
import bilibiliCommand from './bilibiliCommand';
import bingCommand from './bingCommand';
import fsearchCommand from './fsearchCommand';
import githubCommand from './githubCommand';
import googleCommand from './googleCommand';
import mdnCommand from './mdnCommand';
import npmCommand from './npmCommand';
import zhihuCommand from './zhihuCommand';

const commands: CommandType[] = [
  baiduCommand,
  baidudevCommand,
  bilibiliCommand,
  bingCommand,
  fsearchCommand,
  githubCommand,
  googleCommand,
  mdnCommand,
  npmCommand,
  zhihuCommand,
];

const searchDict: Record<string, CommandType> = {};

commands.forEach((command) => {
  searchDict[command.func] = command;
});

const searchCommand: CommandType = {
  func: 'search',
  name: '网页搜索',
  alias: ['s', 'sousuo', 'sou', 'query'],
  desc: '支持从不同平台快捷搜索内容',
  params: [
    {
      key: 'word',
      desc: '搜索内容',
      required: true,
    },
  ],
  options: [
    {
      // 来源
      key: 'from',
      alias: ['f'],
      desc: '搜索源',
      type: 'string',
      defaultValue: 'baidu',
    },
    {
      key: 'self',
      desc: '是否当前页面打开',
      alias: ['s'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  // 默认使用百度搜索
  action: (options, terminal) => {
    const { from = 'baidu' } = options;
    // 执行不同搜索源的搜索方法
    const fromObj = searchDict[from];
    if (!fromObj) {
      terminal.writeErrorOutput('找不到搜索源');
      return;
    }
    return fromObj.action(options, terminal);
  },
};

export default [searchCommand, ...commands];
