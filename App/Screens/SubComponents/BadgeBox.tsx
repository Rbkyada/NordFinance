import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextStyle,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import LightTheme from '@Theme/LightTheme';
import { CustomText } from '@CommonComponent/index';
import { getSize } from '@Utils/Helper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 4,
    overflow: 'hidden',
    gap: 8,
  },
});

interface BadgeBoxProps {
  title: string;
  isSelect?: boolean;
  isImg?: any;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rightImg?: any;
  rightImgStyle?: StyleProp<ImageStyle>;
}

const BadgeBox = memo((props: BadgeBoxProps) => {
  const { container } = styles;
  const {
    title,
    isSelect,
    isImg,
    textStyle,
    containerStyle,
    rightImg,
    rightImgStyle,
  } = props;

  return (
    <View
      style={[
        container,
        {
          backgroundColor:
            (isSelect && LightTheme.secondary) || LightTheme.border,
        },
        containerStyle && containerStyle,
      ]}>
      {rightImg && (
        <Image
          source={{ uri: rightImg }}
          style={[getSize(10), rightImgStyle]}
        />
      )}
      <CustomText
        small
        style={[
          { color: (isSelect && LightTheme.white) || LightTheme.darkText },
          textStyle && textStyle,
        ]}>
        {title}
      </CustomText>
      {isImg && (
        <Image
          resizeMode="contain"
          source={{ uri: isImg }}
          style={{ ...getSize(10) }}
        />
      )}
    </View>
  );
});

export { BadgeBox };
