import { Provide } from '@midwayjs/decorator';
import { query } from '../mysql';
import {
  LabelDTO,
  BookmarkItemDTO,
  BookmarkItemOnlyIdDTO,
  BookmarkItemStickyDTO,
  UserBookmarkItemDTO,
} from '../dto/bookmark';
@Provide()
export class BookmarkService {
  /** --------------------default label -------------- */
  async getLabel() {
    return query('select * from label', []);
  }

  async addLabel(label: string) {
    return query('insert into label (label) values (?)', [label]);
  }

  async updateLabel(label: LabelDTO & { newLabel: string }) {
    await query('update label set label = ? where id = ?', [
      label.newLabel,
      label.id,
    ]);
    return query('update bookmark set label = ? where label = ?', [
      label.newLabel,
      label.label,
    ]);
  }

  async deleteLabel(id: number) {
    return query('delete from label where id = ?', [id]);
  }

  /** --------------------user label -------------- */
  async getUserLabel(user_id: number) {
    return query('select * from label_user where user_id = ?', [user_id]);
  }

  async getIsExistLabel(user_id: number, labelName: string) {
    return query(
      'select label from label_user where user_id = ? and label = ?',
      [user_id, labelName]
    );
  }

  async addUserLabel(user_id: number, label: string) {
    return query('insert into label_user (user_id,label) values (?,?)', [
      user_id,
      label,
    ]);
  }

  async batchAddUserLabel(labels: Array<{ user_id: number; label: string }>) {
    let valueString = '';
    const params = [];
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      valueString += `(?,?)${i === labels.length - 1 ? '' : ','}`;
      params.push(label.user_id, label.label);
    }
    return query(
      `insert into label_user (user_id,label) values ${valueString}`,
      params
    );
  }

  async updateUserLabel(label: LabelDTO & { newLabel: string }) {
    await query('update label_user set label = ? where id = ? ', [
      label.newLabel,
      label.id,
    ]);
    return query('update bookmark_user set label = ? where label = ? ', [
      label.newLabel,
      label.label,
    ]);
  }

  async deleteUserLabel(id: number) {
    return query('delete from label_user where id = ?', [id]);
  }

  /** --------------------default bookmark -------------- */
  async getBookmark() {
    return query('select * from bookmark', []);
  }

  async getBookmarkItem(obj: {
    [key in keyof BookmarkItemDTO]?: BookmarkItemDTO[key];
  }) {
    let queryStr = '';
    const params = [];
    let key: keyof BookmarkItemDTO;
    for (key in obj) {
      queryStr += `${key} = ?`;
      params.push(obj[key]);
    }
    return query(`select * from bookmark where ${queryStr}`, params);
  }

  async addBookmark(bookmarkItem: BookmarkItemDTO) {
    return query(
      'insert into bookmark (name,url,icon,description,label) values (?,?,?,?,?)',
      [
        bookmarkItem.name,
        bookmarkItem.url,
        bookmarkItem.icon,
        bookmarkItem.description,
        bookmarkItem.label,
      ]
    );
  }

  async updateBookmark(bookmarkItem: BookmarkItemDTO) {
    return query(
      'update bookmark set name = ?,url = ? , icon = ?, description = ?,label = ? where id = ?',
      [
        bookmarkItem.name,
        bookmarkItem.url,
        bookmarkItem.icon,
        bookmarkItem.description,
        bookmarkItem.label,
        bookmarkItem.id,
      ]
    );
  }

  async deleteBookmarkItem(bookmarkItem: BookmarkItemOnlyIdDTO) {
    return query('delete from bookmark where id = ?', [bookmarkItem.id]);
  }

  async sticky(bookmarkItem: BookmarkItemStickyDTO) {
    return query('update bookmark set sticky = ? where id = ?', [
      bookmarkItem.sticky,
      bookmarkItem.id,
    ]);
  }

  /** --------------------user bookmark -------------- */
  async getUserBookmark(user_id: number) {
    return query('select * from bookmark_user where user_id = ?', [user_id]);
  }

  async getIsExistUserBookmark(user_id: number, bookmarkName: string) {
    return query(
      'select name from bookmark_user where user_id = ? and name = ?',
      [user_id, bookmarkName]
    );
  }

  async getUserBookmarkItem(obj: {
    [key in keyof UserBookmarkItemDTO]?: UserBookmarkItemDTO[key];
  }) {
    let queryStr = '';
    const params = [];
    Object.keys(obj).map((key, index) => {
      queryStr += `${key} = ? ${
        index === Object.keys(obj).length - 1 ? '' : 'and'
      }`;
      params.push(obj[key]);
    });
    return query(`select * from bookmark_user where ${queryStr}`, params);
  }

  async addUserBookmark(bookmarkItem: UserBookmarkItemDTO) {
    return query(
      'insert into bookmark_user (user_id,name,url,icon,description,label) values (?,?,?,?,?,?)',
      [
        bookmarkItem.user_id,
        bookmarkItem.name,
        bookmarkItem.url,
        bookmarkItem.icon,
        bookmarkItem.description,
        bookmarkItem.label,
      ]
    );
  }

  async batchAddUserBookmark(bookmarkItems: UserBookmarkItemDTO[]) {
    let valueString = '';
    const params = [];
    for (let i = 0; i < bookmarkItems.length; i++) {
      const bookmarkItem = bookmarkItems[i];
      valueString += `(?,?,?,?,?,?)${
        i === bookmarkItems.length - 1 ? '' : ','
      }`;
      params.push(
        bookmarkItem.user_id,
        bookmarkItem.name,
        bookmarkItem.url,
        bookmarkItem.icon,
        bookmarkItem.description,
        bookmarkItem.label
      );
    }

    return query(
      `insert into bookmark_user (user_id,name,url,icon,description,label) values ${valueString}`,
      params
    );
  }

  async updateUserBookmark(bookmarkItem: BookmarkItemDTO) {
    return query(
      'update bookmark_user set name = ?,url = ? , icon = ?, description = ?,label = ? where id = ?',
      [
        bookmarkItem.name,
        bookmarkItem.url,
        bookmarkItem.icon,
        bookmarkItem.description,
        bookmarkItem.label,
        bookmarkItem.id,
      ]
    );
  }

  async deleteUserBookmarkItem(bookmarkItem: BookmarkItemOnlyIdDTO) {
    return query('delete from bookmark_user where id = ? ', [bookmarkItem.id]);
  }

  async deleteUserBookmarkItemByName(user_id: number, bookmarkName: string) {
    return query('delete from bookmark_user where user_id = ? and name = ? ', [
      user_id,
      bookmarkName,
    ]);
  }

  async stickyUserBookmarkItem(bookmarkItem: BookmarkItemStickyDTO) {
    return query('update bookmark_user set sticky = ? where id = ?', [
      bookmarkItem.sticky,
      bookmarkItem.id,
    ]);
  }
}
