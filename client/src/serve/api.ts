import axios from 'axios';
import request from '../lib/request';
import { IResponse } from './type';

type TUser = {
  username: string;
  password: string;
};

export let SearchSuggestController: AbortController | null = null;

export function Login(user: TUser): Promise<IResponse> {
  return request('/login', {
    method: 'post',
    data: user,
  });
}

export function Register(user: TUser): Promise<IResponse> {
  return request('/register', {
    method: 'post',
    data: user,
  });
}

export function GetUserInfo(data: { id: number }): Promise<IResponse> {
  return request('/getUserInfo', {
    method: 'post',
    data,
  });
}

export function GetBookmarks(): Promise<IResponse> {
  return request('./bookmarks', {
    method: 'post',
  });
}

export function AddBookmarkItem(formData: any): Promise<IResponse> {
  return request('./addBookmark', {
    method: 'post',
    data: formData,
  });
}

export function UpdateBookmarkItem(formData: any): Promise<IResponse> {
  return request('./updateBookmark', {
    method: 'post',
    data: formData,
  });
}

export function DeleteBookmarkItem(id: any): Promise<IResponse> {
  return request('/deleteBookmarkItem', {
    method: 'post',
    data: {
      id,
    },
  });
}

export function Sticky(param: {
  id: string | number;
  sticky: number;
}): Promise<IResponse> {
  return request('/sticky', {
    method: 'post',
    data: param,
  });
}

export function AddLabel(label: string): Promise<IResponse> {
  return request('./addLabel', {
    method: 'post',
    data: { label },
  });
}

export function GetLabels(): Promise<IResponse> {
  return request('./labels', {
    method: 'post',
  });
}

export function GetSearchSuggest(word: string): Promise<IResponse> {
  SearchSuggestController = null;
  SearchSuggestController = new AbortController();
  return request('./suggest', {
    method: 'get',
    params: { word },
    signal: SearchSuggestController.signal,
  });
}

export function GetWallpaper(): any {
  return request('https://source.unsplash.com/random');
}
