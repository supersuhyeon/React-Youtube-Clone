import { useQuery } from "@tanstack/react-query"
import { useYoutubeApi } from "../context/YoutubeApiContext"
import VideoCard from "./VideoCard"

export default function RelatedVideos({id}){

    const {youtube} = useYoutubeApi()
    const {isLoading, error, data:relatedVideos} = useQuery(['relatedVideos', id], ()=> youtube.relatedVideos(id), {staleTime: 1000 * 60 * 5})

    return(
       <>
        {isLoading && <p>Loading....</p>}
        {error && <p>something is wrong😥</p>}
        <p className="ml-2">Related Videos</p>
        {relatedVideos && <ul>
            {relatedVideos.map((video)=>{return <VideoCard type='list' key={video.id} video={video}></VideoCard>})}
            </ul>}
       </>
    )
}