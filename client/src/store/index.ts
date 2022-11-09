import { atom, selector } from 'recoil';
import { localforage } from '@/lib/localForage';
import uniqBy from 'lodash/uniqBy';

interface IState {
  showViewport: boolean;
}

export interface IBookmarkItem {
  name: string;
  url: string;
  icon: string;
  label: string;
  description: string;
}

export interface ILabel {
  id: string;
  label: string;
}

export interface IBookmarkState {
  bookmarks: IBookmarkItem[];
  labels: ILabel[];
}

const viewportVisibleState = atom({
  key: 'viewportVisibleState',
  default: false
});


const appGridSpanState = selector({
  key: 'appGridSpanState',
  get: ({ get }) => {
    const viewportVisible = get(viewportVisibleState);
    const terminalSpan = viewportVisible ? 6 : 12;
    const viewportSpan = viewportVisible ? 6 : 0;

    return {
      terminalSpan,
      viewportSpan,
    };
  },
});

const bookmarksState = selector<IBookmarkState>({
  key: 'bookmarkState',
  get: async () => {
    const default_bookmarks: any = await localforage.getItem(
      'default_bookmarks'
    );
    const user_bookmarks: any = (await localforage.getItem('bookmarks')) || [];
    const default_labels: any =
      (await localforage.getItem('default_labels')) || [];
    const user_labels: any = (await localforage.getItem('labels')) || [];

    return {
      bookmarks: uniqBy([...default_bookmarks, ...user_bookmarks], 'name'),
      labels: uniqBy([...default_labels, ...user_labels], 'label'),
    };
  },
});

const viewportComponentListState = atom<JTerminal.ComponentOutputType[]>({
  key: 'viewportComponentListState',
  default: [],
});

export {
  viewportVisibleState,
  appGridSpanState,
  bookmarksState,
  viewportComponentListState,
};
