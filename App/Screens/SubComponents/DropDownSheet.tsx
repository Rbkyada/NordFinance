import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LightTheme from '@Theme/LightTheme';
import { fonts, isIOS } from '@Utils/Constant';
import { CustomText, NetworkImage } from '@CommonComponent/index';
import { en } from '@Localization/index';
import { getSize } from '@Utils/Helper';
import { poolDropDown } from '@Utils/Interface';

const styles = StyleSheet.create({
  dropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  dropDown: {
    paddingVertical: 4,
    borderRadius: 10,
    paddingLeft: 15,
    width: '100%',
  },
  dropContactStyle: {
    marginTop: isIOS ? 2 : 3,
  },
  fontStyle: {
    fontSize: 14,
  },
  labelStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 13,
    columnGap: 10,
  },
  errorTxt: {
    ...fonts.Bold,
    margin: 5,
  },
  dropTitleStyle: {
    ...fonts.Regular,
    marginBottom: 3,
    marginTop: 10,
  },
  iconStyle: {
    marginRight: 15,
  },
  rightImgStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  textPropsStyle: {
    marginLeft: 4,
    flexShrink: 1,
    ...fonts.Medium,
  },
  renderLeftIcon: {
    ...getSize(30),
    borderRadius: 10,
  },
});

interface DropDownProps {
  dataList: poolDropDown[];
  isFocus: boolean;
  search?: boolean;
  value: string;
  searchPlaceholder?: string;
  onFocus: () => void;
  onBlur: () => void;
  onSelectedChangeText: (item: {
    label: string;
    value: string;
    id?: string;
  }) => void;
  error?: string;
  disabled?: boolean;
  valueField?: 'value' | 'label' | 'id';
  placeholder: string;
  dropLabel?: string;
  dropDownStyle?: StyleProp<ViewStyle>;
  dropContainerStyle?: StyleProp<ViewStyle>;
}

const DropDownSheet = memo((props: DropDownProps) => {
  const {
    dropContainer,
    dropContactStyle,
    dropDown,
    fontStyle,
    labelStyle,
    errorTxt,
    dropTitleStyle,
    rightImgStyle,
    textPropsStyle,
    renderLeftIcon,
  } = styles;

  const {
    dataList,
    isFocus = false,
    search = false,
    value,
    onFocus,
    onBlur,
    onSelectedChangeText,
    error,
    disabled = false,
    valueField = 'value',
    placeholder,
    dropLabel,
    dropDownStyle,
    dropContainerStyle,
  } = props;

  const rightImg = () => {
    let newImg = dataList.find((item: any) => item.value === value);
    return newImg?.img;
  };

  return (
    <>
      {dropLabel && (
        <CustomText style={[dropTitleStyle, { color: LightTheme.primaryText }]}>
          {dropLabel}
        </CustomText>
      )}
      <View style={[dropContainer, dropContainerStyle]}>
        <Dropdown
          testID="drop"
          data={dataList}
          labelField="label"
          valueField={valueField}
          disable={disabled}
          containerStyle={[
            dropContactStyle,
            { backgroundColor: LightTheme.screenBackground },
          ]}
          search={search}
          maxHeight={250}
          searchPlaceholder={en.SEARCH}
          activeColor={LightTheme.dropDownBg}
          onChange={(item: { label: string; value: string; id?: string }) => {
            onSelectedChangeText(item);
          }}
          value={value}
          placeholder={placeholder}
          placeholderStyle={[fontStyle, { color: LightTheme.lightRedText }]}
          style={[
            dropDown,
            { backgroundColor: LightTheme.lightRed },
            dropDownStyle,
          ]}
          selectedTextStyle={[fontStyle, { color: LightTheme.lightRedText }]}
          inputSearchStyle={[
            fontStyle,
            {
              backgroundColor: LightTheme.screenBackground,
              color: LightTheme.lightText,
            },
          ]}
          itemContainerStyle={{
            backgroundColor: LightTheme.dropDownBg,
          }}
          selectedTextProps={{
            style: {
              color: LightTheme.placeholderTxt,
              ...textPropsStyle,
            },
          }}
          renderLeftIcon={() => {
            return (
              <>
                {(rightImg() && (
                  <NetworkImage
                    resizeMode="contain"
                    source={rightImg()}
                    imageStyle={rightImgStyle}
                  />
                )) ||
                  null}
              </>
            );
          }}
          renderItem={(item: any, selected) => {
            return (
              <View
                style={[
                  labelStyle,
                  {
                    backgroundColor:
                      (selected && LightTheme.dropDownBg) ||
                      LightTheme.profileModalBg,
                  },
                ]}>
                <NetworkImage
                  resizeMode="contain"
                  source={item.img}
                  imageStyle={renderLeftIcon}
                />
                <CustomText
                  style={[{ color: LightTheme.lightText, flexShrink: 1 }]}>
                  {item.label}
                </CustomText>
              </View>
            );
          }}
          iconStyle={{
            ...styles.iconStyle,
            tintColor: LightTheme.secondaryText,
            transform: [{ rotate: (isFocus && '0deg') || '-90deg' }],
          }}
          fontFamily={fonts.Bold.fontFamily}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
      {(error && (
        <CustomText
          small
          style={[
            errorTxt,
            { color: LightTheme.red },
          ]}>{`${error}`}</CustomText>
      )) ||
        null}
    </>
  );
});

export { DropDownSheet };
