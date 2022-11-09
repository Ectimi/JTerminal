import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';
import * as crossDomain from '@midwayjs/cross-domain';
import * as staticFile from '@midwayjs/static-file';
import * as upload from '@midwayjs/upload';
import * as axios from '@midwayjs/axios';
import * as jwt from '@midwayjs/jwt';

@Configuration({
  imports: [
    axios,
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    crossDomain,
    staticFile,
    upload,
    jwt,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
