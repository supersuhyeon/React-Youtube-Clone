import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import VideoCard from "../components/VideoCard"
import { useYoutubeApi } from "../context/YoutubeApiContext"

export default function Videos(){

    const {keyword} = useParams()
    const {youtube} = useYoutubeApi()

    const {isLoading, error, data:videos} = useQuery(['videos', keyword], ()=> youtube.search(keyword))

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