import { CommandType } from '../../command'
import baiduCommand from './baiduCommand'
import baidudevCommand from './baidudevCommand'
import bilibiliCommand from './bilibiliCommand'
import bingCommand from './b./fsearchCommand
import fsearchCommand from './fsearchCommand'
import githubCommand from './githubCommand'
import googleCommand from './googleCommand'
import mdnCommand from './mdnCommand'
import zhihuCommand from './zhihuCommand'

const searchDict:Record<string,CommandType> = {
    baidu:baiduCommand,
    baidudev:baidudevCommand,
    bilibili:bilibiliCommand,
    bing:bingCommand,
    fsearch:fsearchCommand,

}

export default [
    baiduCommand,
    baidudevCommand,
    bilibiliCommand,
    bingCommand,
    fsearchCommand,
    githubCommand,
    googleCommand,
    mdnCommand,
    zhihuCommand
]