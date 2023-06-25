import React from 'react';
import renderer from 'react-test-renderer';
import { Pressable } from 'react-native';
import { TimeLineContainer } from '@CommonComponent/TimeLineContainer';

jest.mock('rn-range-slider', () => () => ({ run: jest.fn() }));
jest.mock('react-native-config', () => () => ({ run: jest.fn() }));
jest.mock('react-native-element-dropdown', () => () => ({ run: jest.fn() }));
jest.mock('react-native-simple-toast', () => () => ({ run: jest.fn() }));

describe('TimeLineContainer', () => {
  const INVESTED_TIMELINE = [
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
  ];

  it('renders correctly with default props', () => {
    const selectedTimeline = 'Option 1';
    const setSelectedTimeLine = jest.fn();

    const tree = renderer
      .create(
        <TimeLineContainer
          selectedTimeline={selectedTimeline}
          setSelectedTimeLine={setSelectedTimeLine}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders the correct number of timeline buttons', () => {
    const selectedTimeline = 'Option 1';
    const setSelectedTimeLine = jest.fn();

    const component = renderer.create(
      <TimeLineContainer
        selectedTimeline={selectedTimeline}
        setSelectedTimeLine={setSelectedTimeLine}
      />,
    );

    const timelineButtons = component.root.findAllByType(Pressable);

    expect(timelineButtons.length).toBe(INVESTED_TIMELINE.length);
  });
});
