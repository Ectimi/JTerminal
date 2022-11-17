import {
  AddBookmarkItem,
  UpdateBookmarkItem,
  DeleteBookmarkItem,
  Sticky,
} from '@/serve/api';
import { localforage, LocalForageKeys } from '@/lib/localForage';
import { IBookmarkItem, IUser } from '@/store';
import { IBookmarkModalFormData } from './BookmarkModal';
import { showNotification } from '@mantine/notifications';
import { nanoid } from 'nanoid';

export const notify = (type: 'success' | 'error' | 'warn', message: string) => {
  showNotification({
    color: type === 'success' ? 'blue' : type === 'error' ? 'red' : 'yellow',
    message,
    style: {
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '300px',
    },
  });
};

export async function addBookmark(
  data: IBookmarkModalFormData,
  callback?: () => void
) {
  try {
    const user = (await localforage.getItem(LocalForageKeys.USER)) as IUser;

    if (user) {
      const formData = new FormData();
      formData.append('user_id', user.id);
      for (const key in data) {
        formData.append(key, data[key as keyof IBookmarkModalFormData]);
      }
      const res = await AddBookmarkItem(formData);
      if (res.success) {
        localforage.setItem(LocalForageKeys.USER_BOOKMARKS, res.data);
        notify('success', '添加成功');
        typeof callback === 'function' && callback();
      } else {
        notify('error', res.message);
      }
    } else {
      const local_bookmarks = (await localforage.getItem(
        LocalForageKeys.LOCAL_BOOKMARKS
      )) as IBookmarkItem[];

      if (local_bookmarks.some((bookmark) => bookmark.name === data.name)) {
        notify('warn', '该书签名已存在');
        return;
      }

      await localforage.setItem(LocalForageKeys.LOCAL_BOOKMARKS, [
        ...local_bookmarks,
        { ...data, id: nanoid() },
      ]);
      notify('success', '添加成功');
      typeof callback === 'function' && callback();
    }
  } catch (error: any) {
    notify('error', error.message ? error.message : '添加书签遇到未知错误');
  }
}

export async function updateBookmark(
  original: any,
  data: IBookmarkModalFormData,
  callback?: () => void
) {
  try {
    const user = (await localforage.getItem(LocalForageKeys.USER)) as IUser;

    if (user) {
      const user_bookmarks = (await localforage.getItem(
        LocalForageKeys.USER_BOOKMARKS
      )) as IBookmarkItem[];

      const formData = new FormData();
      formData.append('id', original.id);
      for (const key in data) {
        formData.append(key, data[key as keyof IBookmarkModalFormData]);
      }
      const res = await UpdateBookmarkItem(formData);
      if (res.success) {
        for (let i = 0; i < user_bookmarks.length; i++) {
          if (user_bookmarks[i].id === res.data.id) {
            user_bookmarks[i] = {
              ...original,
              ...data,
            };
            break;
          }
        }
        await localforage.setItem(
          LocalForageKeys.USER_BOOKMARKS,
          user_bookmarks
        );
        notify('success', '更新成功');
        typeof callback === 'function' && callback();
      } else {
        notify('error', res.message);
      }
    } else {
      const local_bookmarks = (await localforage.getItem(
        LocalForageKeys.LOCAL_BOOKMARKS
      )) as IBookmarkItem[];

      for (let i = 0; i < local_bookmarks.length; i++) {
        if (local_bookmarks[i].id === original.id) {
          local_bookmarks[i] = {
            ...original,
            ...data,
          };
          break;
        }
      }
      await localforage.setItem(
        LocalForageKeys.LOCAL_BOOKMARKS,
        local_bookmarks
      );
      notify('success', '更新成功');
      typeof callback === 'function' && callback();
    }
  } catch (error: any) {
    notify('error', error.message ? error.message : '更新书签遇到未知错误');
  }
}

export async function deleteBookmark(bookmark_id: any) {
  try {
    const user = (await localforage.getItem(LocalForageKeys.USER)) as IUser;
    if (user) {
      const res = await DeleteBookmarkItem(bookmark_id);
      if (res.success) {
        localforage.setItem(LocalForageKeys.USER_BOOKMARKS, res.data);
        notify('success', '删除成功');
      } else {
        notify('error', res.message || '删除出错了');
      }
    } else {
      const local_bookmarks = (await localforage.getItem(
        LocalForageKeys.LOCAL_BOOKMARKS
      )) as IBookmarkItem[];
      for (let i = 0; i < local_bookmarks.length; i++) {
        if (local_bookmarks[i].id === bookmark_id) {
          local_bookmarks.splice(i, 1);
          break;
        }
      }
      localforage.setItem(LocalForageKeys.LOCAL_BOOKMARKS, local_bookmarks);
      notify('success', '删除成功');
    }
  } catch (error: any) {
    notify('error', error.message ? error.message : '删除书签遇到未知错误');
  }
}

export async function stickyBookmark(bookmark: IBookmarkItem) {
  try {
    const user = (await localforage.getItem(LocalForageKeys.USER)) as IUser;
    if (user) {
      const res = await Sticky({
        id: bookmark.id,
        sticky: Number(bookmark.sticky) === 1 ? 0 : 1,
      });
      if (res.success) {
        const user_bookmarks = (await localforage.getItem(
          LocalForageKeys.USER_BOOKMARKS
        )) as IBookmarkItem[];
        for (let i = 0; i < user_bookmarks.length; i++) {
          if (user_bookmarks[i].id === bookmark.id) {
            user_bookmarks[i].sticky = res.data.sticky;
            break;
          }
        }
        localforage.setItem(LocalForageKeys.USER_BOOKMARKS, user_bookmarks);
      }
    } else {
      const local_bookmarks = (await localforage.getItem(
        LocalForageKeys.LOCAL_BOOKMARKS
      )) as IBookmarkItem[];
      for (let i = 0; i < local_bookmarks.length; i++) {
        if (local_bookmarks[i].id === bookmark.id) {
          local_bookmarks[i].sticky = Number(bookmark.sticky) === 1 ? 0 : 1;
          break;
        }
      }
      localforage.setItem(LocalForageKeys.LOCAL_BOOKMARKS, local_bookmarks);
    }
  } catch (error: any) {
    notify('error', error.message ? error.message : '标记书签遇到未知错误');
  }
}
