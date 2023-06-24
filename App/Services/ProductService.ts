import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';

export const getAllProductPools = async () => {
  const response = await axios.get(ApiConfig.getProductPools);
  return response.data;
};

export const getDetails = async (poolId: number) => {
  const response = await axios.get(
    `${ApiConfig.getCalCulatorDetails}/${poolId}`,
  );
  return response.data;
};

export const setCalculatorPools = async (data: {
  poolId: number;
  frqInDays: number;
  investmentCount: number;
  sipAmount: string;
}) => {
  const response = await axios.post(ApiConfig.getCalculatorPools, data);
  return response.data;
};
