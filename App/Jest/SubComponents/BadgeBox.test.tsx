import renderer from 'react-test-renderer';
import { View, Image } from 'react-native';
import { BadgeBox } from '@SubComponents/BadgeBox';

jest.mock('react-native-config', () => () => ({ run: jest.fn() }));

describe('BadgeBox', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<BadgeBox title="Badge" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with custom container style', () => {
    const customStyle = { width: 100, height: 50 };
    const component = renderer.create(
      <BadgeBox title="Custom Style" containerStyle={customStyle} />,
    );
    const view = component.root.findByType(View);
    expect(view.props.style).toContainEqual(customStyle);
  });

  it('renders with right image when rightImg prop is provided', () => {
    const rightImg = 'https://example.com/right-image.png';
    const component = renderer.create(
      <BadgeBox title="Right Image" rightImg={rightImg} />,
    );
    const image = component.root.findByType(Image);
    expect(image.props.source.uri).toEqual(rightImg);
  });

  it('renders with image when isImg prop is provided', () => {
    const isImg = 'https://example.com/image.png';
    const component = renderer.create(
      <BadgeBox title="Image Badge" isImg={isImg} />,
    );
    const image = component.root.findByType(Image);
    expect(image.props.source.uri).toEqual(isImg);
  });
});
