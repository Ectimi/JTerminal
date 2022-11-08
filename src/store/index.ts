import { atom, selector } from 'recoil';
import { localforage } from '@/lib/localForage';

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

const commonState = atom({
  key: 'commonState',
  default: {
    showViewport: false,
  } as IState,
});

const appGridSpanState = selector({
  key: 'appGridSpanState',
  get: ({ get }) => {
    const { showViewport } = get(commonState);
    const terminalSpan = showViewport ? 6 : 12;
    const viewportSpan = showViewport ? 6 : 0;

    return {
      terminalSpan,
      viewportSpan,
    };
  },
});

const bookmarksState = selector<any>({
  key: 'bookmarkState',
  get: async () => {
    return await localforage.getItem('bookmarks');
  },
});

export { commonState, appGridSpanState, bookmarksState };
