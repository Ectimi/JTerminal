import { MidwayConfig } from '@midwayjs/core';
import { uploadWhiteList } from '@midwayjs/upload';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655965284545_4300',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: fs.readFileSync(
      path.join(__dirname, '../keys/token_rsa_private_key.pem')
    ),
    expiresIn: '30d', // https://github.com/vercel/ms
  },
  passport: {
    session: false,
  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: [...uploadWhiteList, '.ico'],
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(__dirname, '../../public/images'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 0,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容F
    base64: false,
  },
} as unknown as MidwayConfig;
