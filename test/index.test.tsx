import { InMemoryCache, gql } from '@apollo/client';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import Index from '@/src/pages';

const cache = new InMemoryCache();
cache.writeQuery({
  query: gql`
    query Viewer {
      viewer {
        id
        name
        status
      }
    }
  `,
  data: {
    viewer: {
      __typename: 'User',
      id: 'Baa',
      name: 'Baa',
      status: 'Healthy',
    },
  },
});

describe('Index', () => {
  it('renders the html we want', async () => {
    const component = renderer.create(
      <MockedProvider cache={cache}>
        <Index />
      </MockedProvider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
