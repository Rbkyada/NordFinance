import { AxiosHeaders } from 'axios';
import { ApiConfig } from '@ApiConfig/index';
import { INVESTED_TIMELINE } from './Constant';

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

export const formatNumber = (number: number, fix = 0) => {
  let formattedNumber = number;
  if (number >= 1e3 && number < 1e6) {
    formattedNumber = +(number / 1e3).toFixed(fix);
    return `${formattedNumber}K`;
  }
  if (number >= 1e6 && number < 1e9) {
    formattedNumber = +(number / 1e6).toFixed(fix);
    return `${formattedNumber}M`;
  }
  if (number >= 1e9 && number < 1e12) {
    formattedNumber = +(number / 1e9).toFixed(fix);
    return `${formattedNumber}B`;
  }
  if (number >= 1e12) {
    formattedNumber = +(number / 1e12).toFixed(fix);
    return `${formattedNumber}T`;
  }
  return `${formattedNumber}`;
};

export const yearFormatter = (year: number) => {
  return `${Math.round(year)} yrs`;
};

export const getInvestMentCount = (year: number, range: number) => {
  return Math.floor((365 * year) / INVESTED_TIMELINE[range].value);
};
