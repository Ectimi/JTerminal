import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    if (err.name === 'TokenExpiredError') {
      return {
        success: false,
        code: 10001,
        message: err.message,
      };
    }
    // 所有的未分类错误会到这里
    return {
      success: false,
      message: err.message,
    };
  }
}
