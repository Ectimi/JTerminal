import LocalForage from 'localforage';
import PubSub from 'pubsub-js';
import DEFAULT_BOOKMARKS from '@/config/default_bookmark';
import DEFAULT_LABELS from '@/config/default_labels';
import { GetBookmarks, GetLabels } from '@/serve/api';
import { ShowNotification } from '@/lib/notification';
import { IBookmarkItem, IBookmarkState, ILabel, IUser } from '@/store';

interface ICallback {
  success: () => void;
  fail: (error: any) => void;
}

const LocalForageKeys = {
  TOKEN: 'TOKEN',
  USER: 'USER',
  DEFAULT_BOOKMARKS: 'DEFAULT_BOOKMARKS',
  DEFAULT_LABELS: 'DEFAULT_LABELS',
  LOCAL_BOOKMARKS: 'LOCAL_BOOKMARKS',
  LOCAL_LABELS: 'LOCAL_LABELS',
  USER_BOOKMARKS: 'USER_BOOKMARKS',
  USER_LABELS: 'USER_LABELS',
  BACKGROUND_IMAGE: 'BACKGROUND_IMAGE',
};

const PubSubkeys = {
  UPDATE_BOOKMARK: 'UPDATE_BOOKMARK',
};

LocalForage.config({
  driver: LocalForage.INDEXEDDB,
  name: 'JTerminal',
  version: 1.0,
  storeName: 'terminal_store',
  description: 'JTerminal store',
});

let localforage = LocalForage.createInstance({ name: 'JTerminal' });

const originLocalforageSetItem = localforage.setItem;
const originLocalforageRemoveItem = localforage.removeItem;

// 重写 setItem,removeItem 方法，在设置值的时候，同时更新 store 的值
localforage = {
  ...localforage,
  setItem: <T>(
    key: string,
    value: T,
    callback: ((err: any, value: T) => void) | undefined
  ): Promise<T> => {
    return originLocalforageSetItem(key, value, callback).then((newValue) => {
      const fn = async () => {
        let publishValue: any = null;
        if (
          key === LocalForageKeys.LOCAL_BOOKMARKS ||
          key === LocalForageKeys.LOCAL_LABELS
        ) {
          const local_bookmarks = (await localforage.getItem(
            LocalForageKeys.LOCAL_BOOKMARKS
          )) as IBookmarkItem[];
          const local_labels = (await localforage.getItem(
            LocalForageKeys.LOCAL_LABELS
          )) as ILabel[];

          publishValue = {
            bookmarks: local_bookmarks,
            labels: local_labels,
          };

          PubSub.publish(key, {
            type: 'set',
            value: publishValue,
          });
        } else if (
          key === LocalForageKeys.USER_BOOKMARKS ||
          key === LocalForageKeys.USER_LABELS
        ) {
          const user_bookmarks = (await localforage.getItem(
            LocalForageKeys.USER_BOOKMARKS
          )) as IBookmarkItem[];
          const user_labels = (await localforage.getItem(
            LocalForageKeys.USER_LABELS
          )) as ILabel[];

          if (user_bookmarks && user_labels) {
            publishValue = {
              bookmarks: [...user_bookmarks],
              labels: [...user_labels],
            };

            PubSub.publish(key, {
              type: 'set',
              value: publishValue,
            });
          }
        } else if (key === LocalForageKeys.USER) {
          publishValue = (await localforage.getItem(
            LocalForageKeys.USER
          )) as IUser;

          PubSub.publish(key, {
            type: 'set',
            value: publishValue,
          });
        }
      };

      fn();

      return newValue;
    });
  },
  removeItem: (key: string, callback: (err: any) => void): Promise<void> => {
    return originLocalforageRemoveItem(key, callback).then(() => {
      const fn = async () => {
        // 如果删除 token 说明在执行退出登陆操作
        if (key === LocalForageKeys.TOKEN) {
          const local_bookmarks = (await localforage.getItem(
            LocalForageKeys.LOCAL_BOOKMARKS
          )) as IBookmarkItem[];
          const local_labels = (await localforage.getItem(
            LocalForageKeys.LOCAL_LABELS
          )) as ILabel[];

          const publishValue: IBookmarkState = {
            bookmarks: local_bookmarks,
            labels: local_labels,
          };
          PubSub.publish(key, {
            type: 'remove',
            value: publishValue,
          });
        } else if (key === LocalForageKeys.USER) {
          PubSub.publish(key, {
            type: 'remove',
            value: null,
          });
        }
      };
      fn();
    });
  },
};

// 退出登陆时清除用户数据
const clearLocalforage = async () => {
  await localforage.removeItem(LocalForageKeys.TOKEN);
  await localforage.removeItem(LocalForageKeys.USER);
  await localforage.removeItem(LocalForageKeys.USER_BOOKMARKS);
  await localforage.removeItem(LocalForageKeys.USER_LABELS);
  initLocalforage();
};

const initLocalforage = async () => {
  const local_bookmarks = ((await localforage.getItem(
    LocalForageKeys.LOCAL_BOOKMARKS
  )) || []) as any[];
  const local_labels = ((await localforage.getItem(
    LocalForageKeys.LOCAL_LABELS
  )) || []) as any[];

  if (!local_bookmarks.length) {
    await localforage.setItem(
      LocalForageKeys.LOCAL_BOOKMARKS,
      DEFAULT_BOOKMARKS
    );
  }
  if (!local_labels.length) {
    await localforage.setItem(LocalForageKeys.LOCAL_LABELS, DEFAULT_LABELS);
  }
  await localforage.setItem(
    LocalForageKeys.DEFAULT_BOOKMARKS,
    DEFAULT_BOOKMARKS
  );
  await localforage.setItem(LocalForageKeys.DEFAULT_LABELS, DEFAULT_LABELS);
  addUserBookmarks();
  addUserLabels();
};

const addUserBookmarks = async (option?: ICallback) => {
  try {
    const token: any = await localforage.getItem(LocalForageKeys.TOKEN);

    if (token) {
      const data = await GetBookmarks();
      if (data.success) {
        await localforage.setItem(LocalForageKeys.USER_BOOKMARKS, data.data);
        option?.success && option.success();
      } else {
        option?.fail && option.fail(data.message || 'update bookmarks error');
      }
    }
  } catch (error: any) {
    option?.fail && option.fail(error);
    ShowNotification({
      type: 'error',
      title: error.name || 'Error',
      message: error.message || 'addUserBookmarks error',
    });
  }
};

const addUserLabels = async (option?: ICallback) => {
  try {
    const token: any = await localforage.getItem(LocalForageKeys.TOKEN);

    if (token) {
      const data = await GetLabels();
      if (data.success) {
        await localforage.setItem(LocalForageKeys.USER_LABELS, data.data);
        option?.success && option.success();
      } else {
        option?.fail && option.fail(data.message || 'update lables error');
      }
    }
  } catch (error: any) {
    option?.fail && option.fail(error);
    ShowNotification({
      type: 'error',
      title: error.name || 'Error',
      message: error.message || 'addUserLabels error',
    });
  }
};

export {
  localforage,
  LocalForageKeys,
  PubSubkeys,
  initLocalforage,
  addUserBookmarks,
  addUserLabels,
  clearLocalforage,
};
