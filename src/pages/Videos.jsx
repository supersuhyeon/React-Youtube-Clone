import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import VideoCard from "../components/VideoCard"
import { useYoutubeApi } from "../context/YoutubeApiContext"

export default function Videos(){

    const {keyword} = useParams()
    const {youtube} = useYoutubeApi()

    const {isLoading, error, data:videos} = useQuery(['videos', keyword], ()=> youtube.search(keyword), {staleTime: 1000 * 60 * 1})

    return(
        <section className="flex pb-5">
        <div>
        {isLoading && <p>Loading....</p>}
        {error && <p>something is wrong😥</p>}
        {videos && <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
            {videos.map((video)=>{return <VideoCard key={video.id} video={video}></VideoCard>})}
            </ul>}
        </div>
        </section>
      
    )
}