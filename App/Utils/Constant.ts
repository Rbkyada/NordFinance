import { Platform, Dimensions } from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const { height, width } = Dimensions.get('window');

export const aspectRatio = height / width;
export const isiPad = aspectRatio < 1.6;

// Custom Fonts
export const fonts = {
  Regular: { fontFamily: 'DMSans-Regular' },
  Light: { fontFamily: 'DMSans-Medium' },
  Medium: { fontFamily: 'DMSans-Medium' },
  Bold: { fontFamily: 'DMSans-Bold' },
};

// Font Sizes
export const fontSizes = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 25,
  xxxlarge: 32,
};

export const INVESTED_TIMELINE = [
  {
    id: 1,
    label: 'Weekly',
    value: 7,
  },
  {
    id: 2,
    label: 'Monthly',
    value: 30,
  },
  {
    id: 3,
    label: 'Yearly',
    value: 365,
  },
];
