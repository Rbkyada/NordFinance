import React, { memo } from 'react';
import {
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LightTheme from '@Theme/LightTheme';
import CommonStyle from '@Theme/CommonStyle';
import { CustomText } from '@CommonComponent/index';

const styles = StyleSheet.create({
  gradientBtn: {
    height: 56,
    paddingHorizontal: 25,
    minWidth: 100,
    borderWidth: 1,
    ...CommonStyle.center,
  },
  alignSelf: {
    alignSelf: 'center',
  },
  marginVertical: { marginVertical: 5 },
});

interface GradientButtonProps {
  title: string | JSX.Element;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isProcessing?: boolean;
  textOnly?: boolean;
  textColor?: string;
  outerStyle?: StyleProp<ViewStyle>;
}
const ButtonComponent = memo((props: GradientButtonProps) => {
  const {
    title,
    onPress,
    style,
    isProcessing = false,
    textOnly = false,
    textColor,
    outerStyle,
  } = props;

  const { marginVertical } = styles;
  return (
    <Pressable
      onPress={() => onPress()}
      disabled={isProcessing}
      style={[marginVertical, outerStyle, style && style]}
      android_ripple={CommonStyle.androidRipple}>
      {((!isProcessing || textOnly) && (
        <CustomText xlarge style={[{ color: textColor || LightTheme.tint }]}>
          {title}
        </CustomText>
      )) || <ActivityIndicator color={LightTheme.tint} />}
    </Pressable>
  );
});

export { ButtonComponent };
