import { withAllContexts, withRouter } from "../../tests/utils"
import { Route } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import ChannelInfo from "../ChannelInfo"


describe('ChannelInfo', () => {
    const fakeYoutube = {
      channelImageURL: jest.fn(),
    };
  
    afterEach(() => fakeYoutube.channelImageURL.mockReset());
  
    it('renders correctly', async () => {
      fakeYoutube.channelImageURL.mockImplementation(() => 'url');
      render(
        withAllContexts(
          withRouter(
            <Route path='/' element={<ChannelInfo id='id' name='channel' />} />
          ),
          fakeYoutube
        )
      );
      await waitFor(() => screen.getByText('channel'));
    });

    it('renders correctly with snapshot',async()=>{
        fakeYoutube.channelImageURL.mockImplementation(()=>{return 'url'})
        const component = render(
            withAllContexts(
                withRouter(
                    <Route path='/' element={<ChannelInfo id='id' name='name'></ChannelInfo>}></Route>
                ),fakeYoutube
            )
        )
        await screen.findByRole('img')
        expect(component).toMatchSnapshot()
    })

    it('renders without URL', ()=>{
        fakeYoutube.channelImageURL.mockImplementation(()=>{
            throw new Error('error')
        })

        render(
            withAllContexts(
                withRouter(
                    <Route path='/' element={<ChannelInfo id='id' name='name'></ChannelInfo>}></Route>
                ),fakeYoutube
            )
        )
        expect(screen.queryByRole('img')).toBeNull()
    })

    it('renders with URL', async ()=>{
        fakeYoutube.channelImageURL.mockImplementation(()=>{
            return 'url'
        })
        render(
            withAllContexts(
                withRouter(
                    <Route path='/' element={<ChannelInfo id='id' name='name'></ChannelInfo>}></Route>
                ),fakeYoutube
            )
        )
        await screen.findByRole('img')
    })
  });
  