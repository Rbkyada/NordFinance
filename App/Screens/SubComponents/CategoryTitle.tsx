import React, { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import LightTheme from '@Theme/LightTheme';
import { CustomText } from '@CommonComponent/index';
import { fonts } from '@Utils/Constant';

interface CategoryTitleProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
}

const CategoryTitle = memo((props: CategoryTitleProps) => {
  const { title, textStyle } = props;

  return (
    <CustomText
      xlarge
      style={[
        fonts.Bold,
        { color: LightTheme.themeColor },
        textStyle && textStyle,
      ]}>
      {title}
    </CustomText>
  );
});

export { CategoryTitle };
