import renderer from 'react-test-renderer';
import { HomeScreen } from '@Components/Home/HomeScreen';

jest.mock('rn-range-slider', () => () => ({ run: jest.fn() }));
jest.mock('react-native-config', () => () => ({ run: jest.fn() }));
jest.mock('react-native-element-dropdown', () => () => ({ run: jest.fn() }));
jest.mock('react-native-simple-toast', () => () => ({ run: jest.fn() }));

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

jest.mock('@Services/ProductService.ts', () => {
  return {
    getAllProductPools: jest.fn(() => []),
    getDetails: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});
