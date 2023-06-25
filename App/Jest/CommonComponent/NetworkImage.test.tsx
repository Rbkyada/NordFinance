import renderer from 'react-test-renderer';
import { NetworkImage } from '@CommonComponent/NetworkImage';

describe('NetworkImage component', () => {
  it('renders correctly with valid source', () => {
    const source = 'https://example.com/image.jpg';
    const tree = renderer.create(<NetworkImage source={source} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders placeholder when isLoading is true', () => {
    const source = 'https://example.com/image.jpg';
    const placeholder = 'https://example.com/placeholder.jpg';
    const tree = renderer
      .create(<NetworkImage source={source} placeholder={placeholder} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders error image when isError is true', () => {
    const source = 'https://example.com/non-existing-image.jpg';
    const errorImage = 'https://example.com/error-image.jpg';
    const tree = renderer
      .create(<NetworkImage source={source} errorImage={errorImage} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading container while loading', () => {
    const source = 'https://example.com/image.jpg';
    const tree = renderer.create(<NetworkImage source={source} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom styles', () => {
    const source = 'https://example.com/image.jpg';
    const containerStyle = { borderRadius: 10 };
    const imageStyle = { width: 200, height: 200 };
    const tree = renderer
      .create(
        <NetworkImage
          source={source}
          containerStyle={containerStyle}
          imageStyle={imageStyle}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
