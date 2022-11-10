import axios from 'axios';
import { localforage,LocalForageKeys } from '@/lib/localForage';

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ?  'http://127.0.0.1:7001/bookmark'
    : 'http://124.223.24.47:7001/bookmark',
  timeout: 10000,
  withCredentials: false,
});

// 添加请求拦截器
instance.interceptors.request.use(
  async function (config) {
    const token:any = await localforage.getItem(LocalForageKeys.TOKEN)
    // 在发送请求之前做些什么
    config.headers = {
      authorization:  token || '',
    };
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 你的业务数据
    if(response.status === 200){
      return response.data
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    const { response } = error;
    if (response) {
    }

    return Promise.reject(error);
  }
);

export default instance;
