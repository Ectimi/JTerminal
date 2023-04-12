import { Inject, Controller, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { HttpService } from '@midwayjs/axios';
import { IControllerReturn } from '../interface';

@Controller('/bookmark')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  httpService: HttpService;

  @Get('/randomImage')
  async getRandomImage(): Promise<IControllerReturn> {
    //meizi|dongman|fengjing|suiji
    const result = await this.httpService.get(
      'https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=json'
    );
    return { success: true, message: 'OK', data: result.data };
  }
}
