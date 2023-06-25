import renderer from 'react-test-renderer';
import { CategoryTitle } from '@SubComponents/CategoryTitle';

describe('CategoryTitle component', () => {
  it('create Snapshot', () => {
    const title = 'Category Title';
    const textStyle = { color: 'red' };
    const tree = renderer
      .create(<CategoryTitle title={title} textStyle={textStyle} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
