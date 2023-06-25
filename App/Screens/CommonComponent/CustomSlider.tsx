import React, { memo, useEffect, useState } from 'react';
import Slider from 'rn-range-slider';
import LightTheme from '@Theme/LightTheme';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { fonts } from '@Utils/Constant';
import { CustomText } from '@CommonComponent/CustomText';
import { formatNumber, yearFormatter } from '@Utils/Helper';

interface CustomProps {
  min: number;
  mode?: 'year' | 'amount';
  max: number;
  disableRange: boolean;
  width?: string | number;
  containerStyle?: StyleProp<ViewStyle>;
  low: number;
  high?: number;
  onChange: (low: any, high: any) => void;
  onTouchEnd?: ((event: GestureResponderEvent) => void) | undefined;
}
const CustomSlider = (props: CustomProps) => {
  const { min, max, disableRange, low, high, onChange, onTouchEnd, mode } =
    props;

  const [numRange, setNumRange] = useState<number[]>([]);

  useEffect(() => {
    const range = [];
    const step = (max - min) / 5;
    for (let i = 0; i <= 5; i++) {
      range.push(min + step * i);
    }
    setNumRange(range);
  }, []);

  const renderRailSelected = () => (
    <View
      style={{
        ...styles.railSelected,
        backgroundColor: LightTheme.secondary,
      }}
    />
  );

  const renderRail = () => (
    <View
      style={{
        ...styles.rail,
        backgroundColor: LightTheme.themeColor,
      }}
    />
  );

  const renderThumb = () => (
    <View
      style={{
        ...styles.thumb,
        shadowColor: LightTheme.shadowColor,
        backgroundColor: LightTheme.secondary,
        borderColor: LightTheme.secondary,
      }}
    />
  );

  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}>
      <Slider
        min={min}
        max={max}
        low={low}
        high={high}
        disableRange={disableRange}
        step={1}
        floatingLabel={true}
        onValueChanged={onChange}
        onTouchEnd={onTouchEnd}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {numRange.map((item, index) => {
          return (
            <View key={index} style={{ ...styles.lableView }}>
              <CustomText style={styles.sliderLabel}>
                {(mode === 'year' && yearFormatter(item)) || formatNumber(item)}
              </CustomText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(CustomSlider);

const styles = StyleSheet.create({
  filterContainer: {
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 15,
    height: 60,
  },
  label: { flex: 0.8, justifyContent: 'center' },
  tickContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  filterContainer1: { width: '100%' },
  thumb: {
    width: 10 * 2,
    height: 10 * 2,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 1,
  },
  rail: {
    flex: 1,
    height: 3,
    borderRadius: 1,
  },
  railSelected: {
    height: 4,
    borderRadius: 1,
  },
  lableView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  lableView2: {
    minWidth: 80,
    borderRadius: 5,
  },
  sliderLabel: {
    textAlign: 'center',
    ...fonts.Bold,
    padding: 5,
  },
  container: { width: '100%', paddingVertical: 15 },
});
