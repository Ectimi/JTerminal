import { atom, selector } from "recoil";
import DEFAULT_BOOKMARKS from '@/config/default_bookmark';
import DEFAULT_LABELS from '@/config/default_labels';

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
  key: "viewportVisibleState",
  default: false,
});


const bookmarksState = atom<IBookmarkState>({
  key:'bookmarkState',
  default:{
    bookmarks:DEFAULT_BOOKMARKS,
    labels:DEFAULT_LABELS
  }
})

const viewportComponentListState = atom<JTerminal.ComponentOutputType[]>({
  key: "viewportComponentListState",
  default: [],
});

export {
  viewportVisibleState,
  bookmarksState,
  viewportComponentListState,
};
