import { render,screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { Route, useLocation } from "react-router-dom"
import renderer from 'react-test-renderer'
import { fakeVideo as video } from "../../tests/videosData"
import { withRouter } from "../../tests/utils"
import { formatAgo } from "../../util/date"
import VideoCard from "../VideoCard"

describe('VideoCard',()=>{

    const {title, channelTitle, publishedAt, thumbnails} = video.snippet

    it('renders grid type correctly', () => {
        const component = renderer.create(
          withRouter(<Route path='/' element={<VideoCard video={video} />} />)
        );
    
        expect(component.toJSON()).toMatchSnapshot();
      });
    

    it('renders list type correctly', () => {
        const component = renderer.create(
          withRouter(
            <Route path='/' element={<VideoCard video={video} type='list' />} />
          )
        );
    
        expect(component.toJSON()).toMatchSnapshot();
      });


    it('renders video item', ()=>{
        render(
            withRouter(<Route path="/" element={<VideoCard video={video}></VideoCard> }/>)
            )

            const image = screen.getByRole('img'); //img역할을 가지고 있는 컴포넌트를 찾아 담음
            expect(image.src).toBe(thumbnails.medium.url)
            expect(image.alt).toBe(title)
            expect(screen.getByText(title)).toBeInTheDocument()
            expect(screen.getByText(channelTitle)).toBeInTheDocument()
            expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument()
            
    })

    it('navigates to detailed video page with video state when clicked', ()=>{
        function LocationStateDisplay(){
            return <pre>{JSON.stringify(useLocation().state)}</pre>
        }
        render(
            withRouter(
                <>
                    <Route path='/' element={<VideoCard video={video}></VideoCard>}></Route>
                    <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay></LocationStateDisplay>}></Route>
                </>
            )
        )

        const card = screen.getByRole('listitem')
        userEvent.click(card)
        expect(screen.getByText(JSON.stringify({video}))).toBeInTheDocument()
    })

})