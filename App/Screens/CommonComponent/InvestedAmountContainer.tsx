import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AppImages from '@Theme/AppImages';
import LightTheme from '@Theme/LightTheme';
import { CategoryTitle } from '@SubComponents/CategoryTitle';
import { BadgeBox } from '@SubComponents/BadgeBox';
import { en } from '@Localization/index';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  constInputStyle: {
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 10,
    minWidth: 50,
    borderRadius: 12,
    overflow: 'hidden',
    maxWidth: 80,
  },
});

interface InvestedAmountContainerProps {
  value: number;
  setValue: (e: number) => void;
}

const InvestedAmountContainer = (props: InvestedAmountContainerProps) => {
  const { value, setValue } = props;

  console.log('value', value);

  const { container, boxContainer, constInputStyle } = styles;

  return (
    <View style={container}>
      <CategoryTitle title={en.INVESTED_AMOUNT} />
      <View style={boxContainer}>
        <TextInput
          style={[constInputStyle, { backgroundColor: LightTheme.border }]}
          maxLength={7}
          value={(isNaN(value) && '') || value.toString()}
          onChangeText={e => setValue(+e)}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <BadgeBox
          title={en.USD}
          isImg={AppImages.icArrowDown}
          textStyle={{ color: LightTheme.text }}
        />
      </View>
    </View>
  );
};

export { InvestedAmountContainer };
