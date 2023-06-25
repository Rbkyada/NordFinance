import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BadgeBox } from '@SubComponents/BadgeBox';
import { INVESTED_TIMELINE, width } from '@Utils/Constant';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface TimeLineContainerProps {
  selectedTimeline: string;
  setSelectedTimeLine: (e: string) => void;
}

const TimeLineContainer = (props: TimeLineContainerProps) => {
  const { container } = styles;

  const { selectedTimeline, setSelectedTimeLine } = props;

  return (
    <View style={container}>
      {INVESTED_TIMELINE.map((item, index) => {
        let isSelected = selectedTimeline === item.label;
        return (
          <Pressable
            key={index}
            onPress={() => setSelectedTimeLine(item.label)}>
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
