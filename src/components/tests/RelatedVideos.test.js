import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import RelatedVideos from '../RelatedVideos';
import { fakeVideos } from '../../tests/videosData';

describe('RelatedVideos', () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it('renders correctly', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    const { asFragment } = render(
                withAllContexts(
                  withRouter(<Route path='/' element={<RelatedVideos id='id' />} />),
                  fakeYoutube
                )
              );

    await waitForElementToBeRemoved(screen.queryByText('Loading....'));
    expect(asFragment()).toMatchSnapshot();
  });


  it('renders related videos correctly', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    render(
        withAllContexts(
          withRouter(<Route path='/' element={<RelatedVideos id='id' />} />),
          fakeYoutube
        )
      );

    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith('id');
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    );
  });

  it('renders loading', () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    render(
        withAllContexts(
          withRouter(<Route path='/' element={<RelatedVideos id='id' />} />),
          fakeYoutube
        )
      );

    expect(screen.getByText('Loading....')).toBeInTheDocument();
  });

  it('renders error', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error('error');
    });

    render(
        withAllContexts(
          withRouter(<Route path='/' element={<RelatedVideos id='id' />} />),
          fakeYoutube
        )
      );
    await waitFor(() => {
      expect(screen.getByText('something is wrong😥')).toBeInTheDocument();
    });
  });
});