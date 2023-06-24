import React from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { HomeScreen } from '@Components/Home/HomeScreen';
import { configureUrl, getHeaders } from '@Utils/Helper';

axios.interceptors.request.use(
  config => {
    let request = config;
    request.headers = getHeaders();
    request.url = configureUrl(config.url!);
    return request;
  },
  error => error,
);

const index = () => {
  return (
    <View>
      <HomeScreen />
    </View>
  );
};

export default index;
