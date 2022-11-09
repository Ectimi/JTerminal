import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { HttpService } from '@midwayjs/axios';
import { IControllerReturn } from '../interface';

function strToJson(str) {
  return eval('(' + str + ')');
}

@Controller('/bookmark')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Get('/suggest')
  async getSuggest(@Query('word') word: string): Promise<IControllerReturn> {
    const result = await this.httpService.get(
      'https://suggestion.baidu.com/su?p=3&ie=UTF-8&cb&wd=' +
        encodeURIComponent(word)
    );
    const data = strToJson(result.data.replace(/\(|\)|;/g, ''));
    return { success: true, message: 'OK', data: data.s };
  }
}
