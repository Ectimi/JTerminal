import request from '../lib/request';
import {IResponse} from './type'

type TUser = {
  username: string;
  password: string;
};

export function Login(user: TUser):Promise<IResponse> {
  return request('/login', {
    method: 'post',
    data: user,
  });
}

export function Register(user: TUser):Promise<IResponse> {
  return request('/register', {
    method: 'post',
    data: user,
  });
}
