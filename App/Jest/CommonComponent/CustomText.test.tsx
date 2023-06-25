import renderer from 'react-test-renderer';
import { Text } from 'react-native';
import { CustomText } from '@CommonComponent/CustomText';

describe('CustomText', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CustomText>Test Text</CustomText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with custom style', () => {
    const customStyle = { fontWeight: 'bold', fontSize: 16 };
    const component = renderer.create(
      <CustomText style={customStyle}>Custom Style Text</CustomText>,
    );
    const text = component.root.findByType(Text);
    expect(text.props.style).toContainEqual(customStyle);
  });

  it('renders with specified font size', () => {
    const component = renderer.create(
      <CustomText size={20}>Custom Font Size</CustomText>,
    );
    const text = component.root.findByType(Text);
    expect(text.props.style).toContainEqual({ fontSize: 20 });
  });

  it('triggers onPress event when the text is pressed', () => {
    const onPressMock = jest.fn();
    const component = renderer.create(
      <CustomText onPress={onPressMock}>Clickable Text</CustomText>,
    );
    const text = component.root.findByType(Text);
    text.props.onPress();
    expect(onPressMock).toHaveBeenCalled();
  });
});
