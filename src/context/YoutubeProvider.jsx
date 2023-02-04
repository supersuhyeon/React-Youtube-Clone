import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";
// import FakeYoutubeClient from "../api/fakeYoutubeClient";
import { YoutubeApiContext } from "./YoutubeApiContext";

// const client = new FakeYoutubeClient();
const client = new YoutubeClient();
const youtube = new Youtube(client)

export function YoutubeApiProvider({children}){
    return (<YoutubeApiContext.Provider value={{youtube}}>
        {children}
    </YoutubeApiContext.Provider>)
}