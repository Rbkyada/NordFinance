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

export const getSize = (size: number) => {
  return {
    height: size,
    width: size,
  };
};

export const formatNumber = (number: number) => {
  let formattedNumber = number;
  if (number >= 1e3 && number < 1e6) {
    formattedNumber = +(number / 1e3).toFixed(0);
    return `${formattedNumber}K`;
  }
  if (number >= 1e6 && number < 1e9) {
    formattedNumber = +(number / 1e6).toFixed(0);
    return `${formattedNumber}M`;
  }
  if (number >= 1e9 && number < 1e12) {
    formattedNumber = +(number / 1e9).toFixed(0);
    return `${formattedNumber}B`;
  }
  if (number >= 1e12) {
    formattedNumber = +(number / 1e12).toFixed(0);
    return `${formattedNumber}T`;
  }
  return `${formattedNumber}`;
};

export const yearFormatter = (year: number) => {
  return `${Math.round(year)} yrs`;
};

export const getWidth = (width: number | string) => ({ width: width });

export const INVESTING_SINCE = [
  {
    label: '1 years',
    value: '1',
  },
  {
    label: '2 years',
    value: '2',
  },
  {
    label: '3 years',
    value: '3',
  },
  {
    label: '4 years',
    value: '4',
  },
  {
    label: '5 years',
    value: '5',
  },
  {
    label: '6 years',
    value: '6',
  },
];
