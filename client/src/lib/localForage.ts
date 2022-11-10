import LocalForage from 'localforage';
import DEFAULT_BOOKMARKS from '@/config/default_bookmark';
import DEFAULT_LABELS from '@/config/default_labels';
import { GetBookmarks, GetLabels } from '@/serve/user';
import { showNotification } from '@mantine/notifications';

interface ICallback {
  success: () => void;
  fail: (error: any) => void;
}

const LocalForageKeys = {
  TOKEN:"TOKEN",
  USER:"USER",
  DEFAULT_BOOKMARKS: 'DEFAULT_BOOKMARKS',
  DEFAULT_LABELS: 'DEFAULT_LABELS',
  LOCAL_BOOKMARKS: 'LOCAL_BOOKMARKS',
  LOCAL_LABELS: 'LOCAL_LABELS',
  USER_BOOKMARKS: 'USER_BOOKMARKS',
  USER_LABELS: 'USER_LABELS',
};

LocalForage.config({
  driver: LocalForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'JTerminal',
  version: 1.0,
  storeName: 'terminal_store',
  description: 'JTerminal store',
});

const localforage = LocalForage.createInstance({ name: 'JTerminal' });

// 退出登陆时清除用户数据
const clearLocalforage = async () => {
  await localforage.removeItem(LocalForageKeys.TOKEN);
  await localforage.removeItem(LocalForageKeys.USER);
  await localforage.removeItem(LocalForageKeys.USER_BOOKMARKS);
  await localforage.removeItem(LocalForageKeys.USER_LABELS);
  initLocalforage();
};

const initLocalforage = async () => {
  const local_bookmarks = await localforage.getItem(
    LocalForageKeys.LOCAL_BOOKMARKS
  );
  const local_labels = await localforage.getItem(LocalForageKeys.LOCAL_LABELS);
  if (!local_bookmarks) {
    await localforage.setItem(LocalForageKeys.LOCAL_BOOKMARKS, []);
  }
  if (!local_labels) {
    await localforage.setItem(LocalForageKeys.LOCAL_LABELS, []);
  }
  await localforage.setItem(LocalForageKeys.DEFAULT_BOOKMARKS, DEFAULT_BOOKMARKS);
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
    showNotification({
      color: 'red',
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
    showNotification({
      color: 'red',
      title: error.name || 'Error',
      message: error.message || 'addUserLabels error',
    });
  }
};

export {
  localforage,
  LocalForageKeys,
  initLocalforage,
  addUserBookmarks,
  addUserLabels,
  clearLocalforage,
};
