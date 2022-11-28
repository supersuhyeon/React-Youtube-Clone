import { useLocation } from "react-router-dom"
import ChannelInfo from "../components/ChannelInfo";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import RelatedVideos from "../components/RelatedVideos";

export default function VideoDetail(){
    const {state:{video}} = useLocation()
    console.log(video)
    const {title, channelId, channelTitle, description} = video.snippet;

    return(
       <section className="flex flex-col lg:flex-row">

      <article className="basis-4/6">
      <iframe id="player" 
                type="text/html" 
                width="100%" 
                height="640"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
                title={title}
                ></iframe>

        <div className="p-8">
           <h2 className="text-xl font-bold">{title}</h2>
           <ChannelInfo id={channelId} name={channelTitle}></ChannelInfo>
           <pre className="whitespace-pre-wrap">{description}</pre>
        </div>

        <CommentList></CommentList>
      </article>

      <section className="basis-2/6">
        <RelatedVideos id={video.id}></RelatedVideos>
      </section>

       </section>

    )
}