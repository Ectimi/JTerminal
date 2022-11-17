import { atom, selector, AtomEffect } from 'recoil';
import { localforage, LocalForageKeys } from '@/lib/localForage';
import DEFAULT_BOOKMARKS from '@/config/default_bookmark';
import DEFAULT_LABELS from '@/config/default_labels';
import uniqBy from 'lodash/uniqBy';
import PubSub from 'pubsub-js';

interface IState {
  showViewport: boolean;
}

export interface IBookmarkItem {
  id: string | number;
  name: string;
  url: string;
  icon: string;
  label: string;
  description: string;
  sticky: string | number;
}

export interface ILabel {
  id: string;
  label: string;
}

export interface IBookmarkState {
  bookmarks: IBookmarkItem[];
  labels: ILabel[];
}

export interface IUser {
  id: any;
  setting: any;
  username: string;
}

// viewport是否打开
const viewportVisibleState = atom({
  key: 'viewportVisibleState',
  default: false,
});

const userState = atom<IUser | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [
    ({ setSelf, trigger }) => {
      const loadPersisted = async () => {
        const user =
          (await localforage.getItem<IUser>(LocalForageKeys.USER)) || null;

        setSelf(user);
      };
      loadPersisted();

      if (trigger === 'get') {
        loadPersisted();
      }

      PubSub.subscribe(LocalForageKeys.USER, (name: any, data: any) => {
        setSelf(data.value);
      });
    },
  ],
});

// 书签和分类标签
const bookmarksState = atom<IBookmarkState>({
  key: 'bookmarkState',
  default: {
    bookmarks: DEFAULT_BOOKMARKS,
    labels: DEFAULT_LABELS,
  },
  effects_UNSTABLE: [
    ({ setSelf, trigger, onSet }) => {
      const loadPersisted = async () => {
        const token = await localforage.getItem(LocalForageKeys.TOKEN);

        if (token) {
          const user_bookmarks: IBookmarkItem[] =
            (await localforage.getItem(LocalForageKeys.USER_BOOKMARKS)) || [];
          const user_labels: ILabel[] =
            (await localforage.getItem(LocalForageKeys.USER_LABELS)) || [];
          if (user_bookmarks.length && user_labels.length) {
            setSelf({
              bookmarks: uniqBy(
                [...user_bookmarks, ...DEFAULT_BOOKMARKS],
                'name'
              ),
              labels: uniqBy([...user_labels, ...DEFAULT_LABELS], 'label'),
            });
          }
        } else {
          // 未登陆，使用本地数据
          const local_bookmarks: IBookmarkItem[] =
            (await localforage.getItem(LocalForageKeys.LOCAL_BOOKMARKS)) || [];
          const local_labels: ILabel[] =
            (await localforage.getItem(LocalForageKeys.LOCAL_LABELS)) || [];

          setSelf({
            bookmarks: uniqBy(
              [...local_bookmarks, ...DEFAULT_BOOKMARKS],
              'name'
            ),
            labels: uniqBy([...local_labels, ...DEFAULT_LABELS], 'label'),
          });
        }
      };
      loadPersisted();

      if (trigger === 'get') {
        loadPersisted();
      }

      [
        LocalForageKeys.TOKEN,
        LocalForageKeys.USER_BOOKMARKS,
        LocalForageKeys.USER_LABELS,
        LocalForageKeys.LOCAL_BOOKMARKS,
        LocalForageKeys.LOCAL_LABELS,
      ].forEach((key) => {
        PubSub.subscribe(key, (name: any, data: any) => {
          setSelf(data.value);
          // console.log('sub name==>', data, name);
        });
      });
    },
  ],
});

// 在viewport中展示的组件
const viewportComponentListState = atom<JTerminal.ComponentOutputType[]>({
  key: 'viewportComponentListState',
  default: [],
});

export {
  viewportVisibleState,
  bookmarksState,
  viewportComponentListState,
  userState,
};
