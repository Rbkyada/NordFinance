import renderer from 'react-test-renderer';
import { Layout } from '@CommonComponent/Layout';
import { Text, View } from 'react-native';

const props = {
  children: <></>,
};

const component = renderer.create(<Layout {...props} />);

describe('Layout component', () => {
  test('Layout component render', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Layout render correctly', () => {
    const tree = component.toJSON();
    expect(tree).toBeTruthy();
  });

  test('safeContainer test', () => {
    const tree = component.root.findByProps({ testID: 'safeContainer' });
    expect(tree).toBeTruthy();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly without scrollable', () => {
    const tree = renderer
      .create(
        <Layout>
          <View>
            <Text>Content</Text>
          </View>
        </Layout>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with scrollable', () => {
    const tree = renderer
      .create(
        <Layout scrollable={true}>
          <View>
            <Text>Content</Text>
          </View>
        </Layout>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with refresh control', () => {
    const refreshControl = {
      refreshing: false,
      onRefresh: jest.fn(),
    };
    const tree = renderer
      .create(
        <Layout scrollable={true} refreshControl={refreshControl}>
          <View>
            <Text>Content</Text>
          </View>
        </Layout>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
