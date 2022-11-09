import { Inject, Controller, Post, Body, App } from '@midwayjs/decorator';
import { Context, Application } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { UserExcludeIdDTO, UserSettingDTO, UserOnlyIdDTO } from '../dto/user';
import { Validate } from '@midwayjs/validate';
import { IControllerReturn } from '../interface';
import { UserService } from '../service/user.service';
import { BookmarkService } from '../service/label.service';

@Controller('/bookmark')
export class APIController {
  @App()
  app: Application;

  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  bookmarkService: BookmarkService;

  @Post('/login')
  @Validate()
  async login(@Body() user: UserExcludeIdDTO): Promise<IControllerReturn> {
    const findUser = (
      await this.userService.getUser({ username: user.username })
    )[0];
    if (!findUser) {
      return {
        success: false,
        message: '该账号不存在',
        data: '',
      };
    } else {
      if (findUser.password !== user.password) {
        return {
          success: false,
          message: '密码不正确',
          data: '',
        };
      } else {
        return {
          success: true,
          message: 'OK',
          data: {
            user: findUser,
            token: await this.jwt.sign({ data: { ...user, id: findUser.id } }),
          },
        };
      }
    }
  }

  @Post('/register')
  @Validate()
  async register(@Body() user: UserExcludeIdDTO): Promise<IControllerReturn> {
    const findUser = (
      await this.userService.getUser({
        username: user.username,
      })
    )[0];
    if (findUser) {
      return {
        success: false,
        message: '该账号已存在',
        data: '',
      };
    }

    const res: any = await this.userService.addUser(user);
    const allDefaultLabels: any = await this.bookmarkService.getLabel();
    const allDefaultBookmarks: any = await this.bookmarkService.getBookmark();

    await this.bookmarkService.batchAddUserLabel(
      allDefaultLabels.map(label => ({
        ...label,
        user_id: res.insertId,
      }))
    );
    await this.bookmarkService.batchAddUserBookmark(
      allDefaultBookmarks.map(bookmark => ({
        ...bookmark,
        user_id: res.insertId,
      }))
    );

    return { success: true, message: 'OK', data: '' };
  }

  @Post('/getUserInfo')
  @Validate()
  async getUserInfo(@Body() params: UserOnlyIdDTO) {
    const findUser = (await this.userService.getUser({ id: params.id }))[0];
    return { success: true, message: 'OK', data: findUser };
  }

  @Post('/updateSetting')
  @Validate()
  async updateUserSetting(@Body() params: UserSettingDTO) {
    console.log('update setting=>', params);
    await this.userService.updateUserSetting(params);
    const findUser = (await this.userService.getUser({ id: params.id }))[0];
    return { success: true, message: 'OK', data: findUser };
  }
}
