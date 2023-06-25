import React from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
} from 'react-native';
import { isIOS } from '@Utils/Constant';
import CommonStyle from '@Theme/CommonStyle';
import LightTheme from '@Theme/LightTheme';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  titleCenter?: boolean;
  titleTextStyle?: StyleProp<TextStyle>;
  titleNumberOfLines?: number;
  titleMaxLength?: number;
  padding?: number;
  bounces?: boolean;
  submit?: {
    onSubmit?: () => void;
    isSubmitProcessing?: boolean;
    submitTitle?: string;
    submitBtnStyle?: StyleProp<ViewStyle>;
    onSubmitBtnType?: 'btn' | 'img' | 'text' | 'custom';
    customSubmitComponent?: JSX.Element;
    submitImage?: string;
    submitImageStyle?: StyleProp<ImageStyle>;
  };
  scrollable?: boolean;
  backgroundColor?: string;
  showBack?: boolean;
  refreshControl?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  navBarContainerStyle?: StyleProp<ViewStyle>;
  removeContainerView?: boolean;
}

const Layout = (props: LayoutProps) => {
  const {
    children,
    padding = 10,
    scrollable = false,
    refreshControl,
    removeContainerView = false,
    bounces = true,
  } = props;

  return (
    <SafeAreaView style={[CommonStyle.flex1]} testID="safeContainer">
      <StatusBar backgroundColor={LightTheme.themeColor} />
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardView}
        keyboardVerticalOffset={isIOS ? 0 : -500}>
        {(scrollable && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            bounces={bounces}
            contentContainerStyle={[styles.scrollContainer, { padding }]}
            testID="scrollContainer"
            refreshControl={
              (refreshControl && (
                <RefreshControl
                  refreshing={refreshControl.refreshing}
                  onRefresh={refreshControl.onRefresh}
                  tintColor={LightTheme.themeColor}
                />
              )) ||
              undefined
            }>
            {children}
          </ScrollView>
        )) ||
          (removeContainerView && (
            <View style={{ padding }}>{children}</View>
          )) || (
            <View style={[CommonStyle.flex1, { padding }]}>{children}</View>
          )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: { flexGrow: 1 },
});

export { Layout };
