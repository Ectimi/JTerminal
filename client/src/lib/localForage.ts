import LocalForage from 'localforage';
import DEFAULT_BOOKMARKS from '@/config/default_bookmark';
import DEFAULT_LABELS from '@/config/default_labels';
import { GetBookmarks, GetLabels } from '@/serve/user';
import { showNotification } from '@mantine/notifications';

interface ICallback {
  success: () => void;
  fail: (error: any) => void;
}

LocalForage.config({
  driver: LocalForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'JTerminal',
  version: 1.0,
  storeName: 'terminal_store',
  description: 'JTerminal store',
});

const localforage = LocalForage.createInstance({ name: 'JTerminal' });

const clearLocalforage = async () => {
  await localforage.removeItem('token');
  await localforage.removeItem('user');
  await localforage.removeItem('bookmarks');
  await localforage.removeItem('labels');
  initLocalforage()
};

const initLocalforage = async()=>{
  await localforage.setItem('default_bookmarks', DEFAULT_BOOKMARKS);
  await localforage.setItem('default_labels', DEFAULT_LABELS);
  addUserBookmarks()
  addUserLabels()
}

const addUserBookmarks = async (option?: ICallback) => {
  try {
    const token: any = await localforage.getItem('token');

    if (token) {
      const data = await GetBookmarks();
      if (data.success) {
        await localforage.setItem('bookmarks', data.data);
        option?.success && option.success();
      } else {
        option?.fail && option.fail(data.message || 'update bookmarks error');
      }
    } 
  } catch (error:any) {
    option?.fail && option.fail(error);
    showNotification({
      color:'red',
      title: error.name|| 'Error',
      message: error.message || 'addUserBookmarks error',
    })
  }
};

const addUserLabels = async (option?: ICallback) => {
  try {
    const token: any = await localforage.getItem('token');

    if (token) {
      const data = await GetLabels();
      if (data.success) {
        await localforage.setItem('labels', data.data);
        option?.success && option.success();
      } else {
        option?.fail && option.fail(data.message || 'update lables error');
      }
    } 
  } catch (error:any) {
    option?.fail && option.fail(error);
    showNotification({
      color:'red',
      title: error.name|| 'Error',
      message: error.message || 'addUserLabels error',
    })
  }
};

export { localforage, initLocalforage, addUserBookmarks, addUserLabels, clearLocalforage };
