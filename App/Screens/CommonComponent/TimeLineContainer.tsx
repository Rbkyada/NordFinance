import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BadgeBox } from '@SubComponents/BadgeBox';
import { INVESTED_TIMELINE, width } from '@Utils/Constant';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
});

interface TimeLineContainerProps {
  selectedTimeline: number;
  setSelectedTimeLine: (e: number) => void;
}

const TimeLineContainer = (props: TimeLineContainerProps) => {
  const { container } = styles;

  const { selectedTimeline, setSelectedTimeLine } = props;

  return (
    <View style={container}>
      {INVESTED_TIMELINE.map((item, index) => {
        let isSelected = selectedTimeline === item.value;
        return (
          <Pressable
            key={index}
            onPress={() => setSelectedTimeLine(item.value)}>
            <BadgeBox
              title={item.label}
              isSelect={isSelected}
              containerStyle={{
                width: width / 3.4,
                paddingVertical: 5,
              }}
              textStyle={{
                fontSize: 15,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export { TimeLineContainer };
