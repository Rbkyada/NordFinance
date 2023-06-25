import React from 'react';
import renderer from 'react-test-renderer';
import { Pressable } from 'react-native';
import { ButtonComponent } from '@SubComponents/AppButton';

describe('ButtonComponent', () => {
  it('renders correctly with title', () => {
    const title = 'Submit';
    const onPress = jest.fn();
    const tree = renderer
      .create(<ButtonComponent title={title} onPress={onPress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with processing state', () => {
    const title = 'Submit';
    const onPress = jest.fn();
    const isProcessing = true;
    const tree = renderer
      .create(
        <ButtonComponent
          title={title}
          onPress={onPress}
          isProcessing={isProcessing}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress function when pressed', () => {
    const title = 'Submit';
    const onPress = jest.fn();
    const component = renderer.create(
      <ButtonComponent title={title} onPress={onPress} />,
    );
    const button = component.root.findByType(Pressable);
    button.props.onPress();
    expect(onPress).toHaveBeenCalled();
  });

  it('renders correctly with text-only mode', () => {
    const title = 'Submit';
    const onPress = jest.fn();
    const textOnly = true;
    const tree = renderer
      .create(
        <ButtonComponent title={title} onPress={onPress} textOnly={textOnly} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress function when pressed', () => {
    const title = 'Submit';
    const onPress = jest.fn();
    const component = renderer.create(
      <ButtonComponent title={title} onPress={onPress} />,
    );
    const touchable = component.root.findByType(Pressable);
    touchable.props.onPress();
    expect(onPress).toHaveBeenCalled();
  });
});
