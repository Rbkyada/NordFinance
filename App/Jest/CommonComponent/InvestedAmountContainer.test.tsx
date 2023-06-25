import renderer from 'react-test-renderer';
import { TextInput } from 'react-native';
import { InvestedAmountContainer } from '@CommonComponent/InvestedAmountContainer';

jest.mock('react-native-config', () => () => ({ run: jest.fn() }));

describe('InvestedAmountContainer', () => {
  it('renders correctly', () => {
    const mockValue = 1000;
    const mockSetValue = jest.fn();

    const tree = renderer
      .create(
        <InvestedAmountContainer value={mockValue} setValue={mockSetValue} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls setValue with the parsed number when onChangeText is called', () => {
    const mockValue = 1000;
    const mockSetValue = jest.fn();
    const component = renderer.create(
      <InvestedAmountContainer value={mockValue} setValue={mockSetValue} />,
    );
    const textInput = component.root.findByType(TextInput);

    const newValue = '5000';
    textInput.props.onChangeText(newValue);

    expect(mockSetValue).toHaveBeenCalledWith(5000);
  });

  it('calls setValue with NaN when an invalid value is entered', () => {
    const mockValue = 1000;
    const mockSetValue = jest.fn();
    const component = renderer.create(
      <InvestedAmountContainer value={mockValue} setValue={mockSetValue} />,
    );
    const textInput = component.root.findByType(TextInput);

    const newValue = 'abc';
    textInput.props.onChangeText(newValue);

    expect(mockSetValue).toHaveBeenCalledWith(NaN);
  });
});
