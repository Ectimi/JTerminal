import { Provide } from '@midwayjs/decorator';
import { query } from '../mysql';
import { UserDTO, UserExcludeIdDTO, UserSettingDTO } from '../dto/user';
import { IUserSetting } from '../interface';

@Provide()
export class UserService {
  async addUser(user: UserExcludeIdDTO) {
    const defaultSetting: IUserSetting = {
      theme: 'light',
      labelsSort: [],
      defaultExpandLabel: false,
      openInNewTab: true,
    };

    return query(
      'insert into user (username,password,setting) values (?,?,?)',
      [user.username, user.password, JSON.stringify(defaultSetting)]
    );
  }

  async getUser(obj: {
    [key in keyof UserDTO]?: UserDTO[key];
  }) {
    let queryStr = '';
    const params = [];
    Object.keys(obj).map((key, index) => {
      queryStr += `${key} = ? ${
        index === Object.keys(obj).length - 1 ? '' : 'and'
      }`;
      params.push(obj[key]);
    });
    return query(`select * from user where ${queryStr}`, params);
  }

  async getUserSetting(user_id: number) {
    return query('select setting from user where id = ?', user_id);
  }

  async updateUserSetting(param: UserSettingDTO) {
    return query('update user set setting = ? where id = ?', [
      param.setting,
      param.id,
    ]);
  }
}
