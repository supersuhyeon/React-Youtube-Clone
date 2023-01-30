import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withRouter, withAllContexts } from '../../tests/utils';
import Videos from '../Videos';
import { fakeVideo, fakeVideos } from "../../tests/videosData"

describe('Videos component', () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    fakeYoutube.search.mockImplementation((keyword) => {
      return keyword ? [fakeVideo] : fakeVideos;
    });
  });

  afterEach(() => {
    fakeYoutube.search.mockReset();
  });

  it('renders all videos when keyword is not specified', async () => {
    render(
        withAllContexts(
          withRouter(
            <>
              <Route path='/' element={<Videos />} />
              <Route path='/:keyword' element={<Videos />} />
            </>,
            '/'
          ),
          fakeYoutube
        )
      );

    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined);
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    );
  });

  it('when keyword is specified, renders search results', async () => {
    const searchKeyword = 'fake-keyword';
    render(
        withAllContexts(
          withRouter(
            <>
              <Route path='/' element={<Videos />} />
              <Route path='/:keyword' element={<Videos />} />
            </>,
            `/${searchKeyword}`
          ),
          fakeYoutube
        )
      );

    expect(fakeYoutube.search).toHaveBeenCalledWith(searchKeyword);
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  it('renders loading state when items are being fetched', async () => {
    render(
        withAllContexts(
          withRouter(
            <>
              <Route path='/' element={<Videos />} />
              <Route path='/:keyword' element={<Videos />} />
            </>,
            '/'
          ),
          fakeYoutube
        )
      );

    expect(screen.getByText('Loading....')).toBeInTheDocument();
  });

  it('renders error state when fetching items fails', async () => {
    fakeYoutube.search.mockImplementation(async () => {
      throw new Error('error');
    });

    render(
        withAllContexts(
          withRouter(
            <>
              <Route path='/' element={<Videos />} />
              <Route path='/:keyword' element={<Videos />} />
            </>,
            '/'
          ),
          fakeYoutube
        )
      );

    await waitFor(() => {
      expect(screen.getByText('something is wrong😥')).toBeInTheDocument();
    });
  });

//   function renderWithPath(pathh) {
//     return render(
//       withAllContexts(
//         withRouter(
//           <>
//             <Route path='/' element={<Videos />} />
//             <Route path='/:keyword' element={<Videos />} />
//           </>,
//           pathh
//         ),
//         fakeYoutube
//       )
//     );
//   }
});
