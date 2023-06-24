import Config from 'react-native-config';

const productionUrl = Config.API_URL;
const developmentUrl = Config.API_DEV_URL;

const ENVIRONMENT = {
  PROD: 'PROD',
  DEV: 'DEV',
};

const currentEnv: any = Config.ENVIRONMENT;

const baseUrls = {
  [ENVIRONMENT.PROD]: productionUrl,
  [ENVIRONMENT.DEV]: developmentUrl,
};

const baseUrl = baseUrls[currentEnv];

const baseUrlApi = `${baseUrl}api/`;

let ApiConfig = {
  baseUrl,
  baseUrlApi,
  token: null as string | null,
  login: `${baseUrlApi}login`,
  user: `${baseUrlApi}users`,
  getProductPools: `${baseUrlApi}product/all-pools`,
  getCalculatorPools: `${baseUrlApi}product/calculator-for-pool`,
  getCalCulatorDetails: `${baseUrlApi}product/calculator-details`,
};

export { ApiConfig };
