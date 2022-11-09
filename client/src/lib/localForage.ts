import LocalForage from 'localforage';
import { DEFAULT_BOOKMARKS } from '@/config/default_bookmark';
import { GetBookmarks } from '@/serve/user';

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
};

const updateBookmarks = async (option?: ICallback) => {
  try {
    const token: any = await localforage.getItem('token');

    if (token) {
      const data = await GetBookmarks();
      if (data.success) {
        await localforage.setItem('bookmarks', data.data);
        option?.success && option.success();
      } else {
        option?.fail &&  option.fail(data.message || 'update bookmarks error');
      }
    } else {
      await localforage.setItem('bookmarks', DEFAULT_BOOKMARKS);
    }
  } catch (error) {
    option?.fail &&  option.fail(error);
  }
};

export { localforage, updateBookmarks, clearLocalforage };
