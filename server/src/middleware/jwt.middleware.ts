// src/middleware/jwt.middleware

import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        // 判断下有没有校验信息
        if (!ctx.headers['authorization']) {
          throw new httpError.UnauthorizedError();
        }
        // 从 header 上获取校验信息
        const token = ctx.get('authorization');
        if (!token) {
          throw new httpError.UnauthorizedError();
        }
        //jwt.verify方法验证token是否有效
        await this.jwtService.verify(token, {
          complete: true,
        });
      } catch (error) {
        return {
          success: false,
          message: 'token已过期，请重新登录',
          data: '',
        };
      }
      await next();
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const prefix = '/bookmark';
    const matches = [
      '/addLabel',
      '/updateLabel',
      '/deleteLabel',

      '/addBookmark',
      '/updateBookmark',
      '/deleteBookmarkItem',
      '/sticky',
    ];

    return matches.map(path => prefix + path).includes(ctx.path);
  }
}
