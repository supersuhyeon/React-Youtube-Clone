import { render,screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import { formatAgo } from "../../util/date"
import VideoCard from "../VideoCard"

describe('VideoCard',()=>{
    const video = {
        id:1,
        snippet: {
            title: 'title',
            channelId: '1',
            channelTitle:'channelTitle',
            publishedAt: new Date(),
            thumbnails:{
                medium:{
                    url: 'http://image/',
                }
            }
        }
    }
    const {title, channelTitle, publishedAt, thumbnails} = video.snippet

    it('renders video item', ()=>{
        render(
            <MemoryRouter>
                <VideoCard video={video}></VideoCard>
            </MemoryRouter>
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
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={<VideoCard video={video}></VideoCard>}></Route>
                    <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay></LocationStateDisplay>}></Route>
                </Routes>
            </MemoryRouter>
        )

        const card = screen.getByRole('listitem')
        userEvent.click(card)
        expect(screen.getByText(JSON.stringify({video}))).toBeInTheDocument()
    })

})