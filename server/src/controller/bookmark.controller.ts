import {
  Inject,
  Controller,
  Post,
  Body,
  Files,
  Fields,
  App,
} from '@midwayjs/decorator';
import { Context, Application } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { BookmarkService } from '../service/label.service';
import {
  BookmarkItemDTO,
  BookmarkItemOnlyIdDTO,
  BookmarkItemOnlyNameDTO,
  BookmarkItemExcludeIconDTO,
  BookmarkItemStickyDTO,
  UserBookmarkItemDTO,
  LabelDTO,
  UserLabelDTO,
} from '../dto/bookmark';
import { Validate } from '@midwayjs/validate';
import { UploadFileInfo } from '@midwayjs/upload';
import config from '../config/config.default';
import mysqlConfig from '../mysql/config';
import { getIpAddress } from '../utils';
import { IControllerReturn } from '../interface';
import { UserService } from '../service/user.service';

@Controller('/bookmark')
export class APIController {
  @App()
  app: Application;

  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Inject()
  bookmarkService: BookmarkService;

  @Inject()
  userService: UserService;

  @Post('/labels')
  async getLabel(): Promise<IControllerReturn> {
    const token = this.ctx.headers['authorization'];
    let labels;
    if (!token) {
      labels = await this.bookmarkService.getLabel();
    } else {
      const auth: any = await this.jwt.verify(token, {
        complete: true,
      });

      const user_id = auth.payload.data.id;
      if (auth) {
        labels = await this.bookmarkService.getUserLabel(user_id);
      }
    }

    return { success: true, message: 'OK', data: labels || [] };
  }

  @Post('/addLabel')
  @Validate()
  async addLabel(@Body() label: LabelDTO): Promise<IControllerReturn> {
    const token = this.ctx.headers['authorization'];
    const auth: any = await this.jwt.verify(token, {
      complete: true,
    });
    const user_id = auth.payload.data.id;
    const isExist = await this.bookmarkService.getIsExistLabel(
      user_id,
      label.label
    );
    if (isExist[0] && isExist[0].label) {
      return {
        success: false,
        message: '该标签名已存在',
        data: '',
      };
    }
    const newLabel: any = await this.bookmarkService.addUserLabel(
      user_id,
      label.label
    );
    let setting = (await this.userService.getUserSetting(user_id))[0].setting;
    setting = JSON.parse(setting);
    if (setting.labelsSort.length) {
      setting.labelsSort.push(newLabel.insertId);
    }
    await this.userService.updateUserSetting({
      setting: JSON.stringify(setting),
      id: user_id,
    });

    return this.getLabel();
  }

  @Post('/updateLabel')
  @Validate()
  async updateLabel(
    @Body() label: LabelDTO & { newLabel: string }
  ): Promise<IControllerReturn> {
    const token = this.ctx.headers['authorization'];
    const auth: any = await this.jwt.verify(token, {
      complete: true,
    });
    const user_id = auth.payload.data.id;

    await this.bookmarkService.updateUserLabel(label);
    const labels = await this.bookmarkService.getUserLabel(user_id);
    const bookmarks = await this.bookmarkService.getUserBookmark(user_id);

    return {
      success: true,
      message: 'OK',
      data: {
        labels,
        bookmarks,
      },
    };
  }

  //删除label后，把该label分类下的书签改为其他，并更新设置中的labelsSort
  @Post('/deleteLabel')
  @Validate()
  async deleteLabel(@Body() label: UserLabelDTO): Promise<IControllerReturn> {
    const token = this.ctx.headers['authorization'];
    const auth: any = await this.jwt.verify(token, {
      complete: true,
    });
    const user_id = auth.payload.data.id;

    const queryBookmarks: any = await this.bookmarkService.getUserBookmarkItem({
      label: label.label,
    });
    for (let i = 0; i < queryBookmarks.length; i++) {
      const bookmark = queryBookmarks[i];
      await this.bookmarkService.updateUserBookmark({
        ...bookmark,
        label: '其他',
      });
    }
    let setting = (await this.userService.getUserSetting(user_id))[0].setting;
    setting = JSON.parse(setting);
    setting.labelsSort = setting.labelsSort.filter(id => id !== label.id);

    await this.userService.updateUserSetting({
      setting: JSON.stringify(setting),
      id: user_id,
    });
    await this.bookmarkService.deleteUserLabel(label.id);
    const labels = await this.bookmarkService.getUserLabel(user_id);
    const bookmarks: any = await this.bookmarkService.getUserBookmark(user_id);
    const ip =
      this.app.getEnv() === 'production' ? mysqlConfig.host : getIpAddress();
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].icon && bookmarks[i].icon.indexOf('public') > -1) {
        bookmarks[
          i
        ].icon = `http://${ip}:${config.koa.port}${bookmarks[i].icon}`;
      }
    }

    return {
      success: true,
      message: 'OK',
      data: {
        labels,
        bookmarks,
      },
    };
  }

  @Post('/bookmarks')
  async getBookmark(): Promise<IControllerReturn> {
    let bookmarks: any;
    const token = this.ctx.headers['authorization'];
    if (!token) {
      bookmarks = await this.bookmarkService.getBookmark();
    } else {
      const auth: any = await this.jwt.verify(token, {
        complete: true,
      });
      if (auth) {
        bookmarks = await this.bookmarkService.getUserBookmark(
          auth.payload.data.id
        );
      }
    }
    const ip =
      this.app.getEnv() === 'production' ? mysqlConfig.host : getIpAddress();
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].icon && !bookmarks[i].icon.startsWith('http')) {
        bookmarks[
          i
        ].icon = `http://${ip}:${config.koa.port}${bookmarks[i].icon}`;
      }
    }
    return { success: true, message: 'OK', data: bookmarks };
  }

  @Post('/addBookmark')
  @Validate()
  async addBookmark(
    @Files() files: UploadFileInfo<string>[],
    @Fields() fields: BookmarkItemDTO | BookmarkItemExcludeIconDTO
  ): Promise<IControllerReturn> {
    const token = this.ctx.headers['authorization'];
    const auth: any = await this.jwt.verify(token, {
      complete: true,
    });
    const user_id = auth.payload.data.id;
    const isExist = await this.bookmarkService.getIsExistUserBookmark(
      user_id,
      fields.name
    );
    if (isExist[0] && isExist[0].name) {
      return {
        success: false,
        message: '该书签名已存在',
        data: '',
      };
    }
    if (files && files.length) {
      if (files[0].fieldName !== 'icon') {
        return {
          success: false,
          message: 'icon is required',
          data: '',
        };
      }
      const filename = files[0].data.match(/upload_.+/)[0];
      const iconUrl = '/public/images/' + filename;
      await this.bookmarkService.addUserBookmark({
        user_id,
        ...fields,
        icon: iconUrl,
      });
      return this.getBookmark();
    } else {
      await this.bookmarkService.addUserBookmark({
        ...fields,
        user_id,
      } as UserBookmarkItemDTO);
      return this.getBookmark();
    }
  }

  @Post('/updateBookmark')
  @Validate()
  async updateBookmark(
    @Files() files: UploadFileInfo<string>[],
    @Fields() fields: BookmarkItemDTO | BookmarkItemExcludeIconDTO
  ): Promise<IControllerReturn> {
    const ip =
      this.app.getEnv() === 'production' ? mysqlConfig.host : getIpAddress();
    if (files && files.length) {
      if (files[0].fieldName !== 'icon') {
        return {
          success: false,
          message: 'icon is required',
          data: '',
        };
      }
      const filename = files[0].data.match(/upload_.+/)[0];
      const iconUrl = '/public/images/' + filename;
      await this.bookmarkService.updateUserBookmark({
        ...fields,
        icon: iconUrl,
      });
      const bookmarks = await this.bookmarkService.getUserBookmarkItem({
        id: fields.id,
      });

      return {
        success: true,
        message: 'OK',
        data: {
          ...bookmarks[0],
          icon: `http://${ip}:${config.koa.port}${iconUrl}`,
        },
      };
    } else {
      await this.bookmarkService.updateUserBookmark(fields as BookmarkItemDTO);
      const bookmarks = await this.bookmarkService.getUserBookmarkItem({
        id: fields.id,
      });
      return { success: true, message: 'OK', data: bookmarks[0] };
    }
  }

  @Post('/deleteBookmarkItem')
  @Validate()
  async deleteBookmarkItem(
    @Body() bookmarkItem: BookmarkItemOnlyIdDTO
  ): Promise<IControllerReturn> {
    await this.bookmarkService.deleteUserBookmarkItem(bookmarkItem);
    return this.getBookmark();
  }

  @Post('/deleteBookmarkItemByName')
  @Validate()
  async deleteBookmarkItemByName(
    @Body() bookmark: BookmarkItemOnlyNameDTO
  ): Promise<IControllerReturn> {
    const token = this.ctx.headers['authorization'];
    const auth: any = await this.jwt.verify(token, {
      complete: true,
    });
    const user_id = auth.payload.data.id;

    await this.bookmarkService.deleteUserBookmarkItemByName(
      user_id,
      bookmark.name
    );
    return this.getBookmark();
  }

  @Post('/sticky')
  @Validate()
  async sticky(
    @Body() bookmarkItem: BookmarkItemStickyDTO
  ): Promise<IControllerReturn> {
    await this.bookmarkService.stickyUserBookmarkItem(bookmarkItem);
    return { success: true, message: 'OK', data: bookmarkItem };
  }
}
