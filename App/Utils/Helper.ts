import { AxiosHeaders } from 'axios';
import { ApiConfig } from '@ApiConfig/index';

export const getHeaders = () => {
  let token: string | null = ApiConfig.token;
  const headers = new AxiosHeaders();

  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  return headers;
};

export const configureUrl = (url: string) => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};
