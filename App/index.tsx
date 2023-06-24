import React from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { HomeScreen } from '@Components/Home/HomeScreen';
import { configureUrl, getHeaders } from '@Utils/Helper';
import CommonStyle from '@Theme/CommonStyle';

axios.interceptors.request.use(
  config => {
    let request = config;
    request.headers = getHeaders();
    request.url = configureUrl(config.url!);
    console.log('request', request.url);
    return request;
  },
  error => error,
);

const index = () => {
  return (
    <View style={CommonStyle.flex1}>
      <HomeScreen />
    </View>
  );
};

export default index;
