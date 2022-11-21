import renderer from 'react-test-renderer';
import Index from '@/src/pages';

describe('Index', () => {
  it('renders the html we want', async () => {
    const component = renderer.create(<Index />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
