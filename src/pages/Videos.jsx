import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import VideoCard from "../components/VideoCard"
import Youtube from "../api/youtube"
import FakeYoutube from "../api/fakeYoutube"

export default function Videos(){

    const {keyword} = useParams()
    const {isLoading, error, data:videos} = useQuery(['videos', keyword], ()=>{
        const youtube = new Youtube()
       return youtube.search(keyword)
    })

    return(
        <>
        <div>Videos : { keyword ? `${keyword}` : 'Hot trend video list ❤️‍🔥' }</div>
        {isLoading && <p>Loading....</p>}
        {error && <p>something is wrong😥</p>}
        {videos && <ul>
            {videos.map((video)=>{return <VideoCard key={video.id} video={video}></VideoCard>})}
            </ul>}
        </>
      
    )
}