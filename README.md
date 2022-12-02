## React Youtube Clone Coding

![ezgif com-gif-maker (52)](https://user-images.githubusercontent.com/94214512/204415188-396f186d-8aef-4979-a585-fd2139da159a.gif) <br>
This is a Youtube clone project that helped me to practice how to communicate with a network using Axios & read open source APIs to apply to my project.<br>
[Youtube Clone Coding](https://darling-cheesecake-c962f9.netlify.app/)

### Goals of the project

1. Build components hierarchy and use React router for making a single page application
2. Fetch Youtube's data API (mock data and real data)
3. Use React router's components and hooks like outlet, useParams, useLocation, and useNavigate
4. Use React-query to manage asynchronous requests and data effectively
5. Practice TailwindCSS

### Languages

React, TailwindCSS

### Features

**1. Build components hierarchy and use React router for making a single page application** <br>
![youtube-api-readme](https://user-images.githubusercontent.com/94214512/205185909-b76ce979-2b61-450b-8917-6d0059bb3efe.png)

1. Add a router for making a single page application in index.js<br>

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // the starting point of this application (top level element)
    errorElement: <NotFound></NotFound>,
    children: [
      //Outlet
      { index: true, element: <Videos></Videos> },
      { path: "/videos", element: <Videos></Videos> },
      { path: "/videos/:keyword", element: <Videos></Videos> },
      { path: "/videos/watch/:videoId", element: <VideoDetail></VideoDetail> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
```

2. Each component/pages represents:

- App: top level element
- SearchHeader: logo and input element that user can use to search
- Outlet: children route elements (videoes and videoDetail)
- ThemeModeBtn: toggle button that is able to change darkmode and lightmode
- Videos: show videos that user searched by keyword
- VideoCard: how each video looks like (thumbnails, title, channel name, and published date)
- VideoDetail: a video's detail page
- ChannelInfo: the video channel's thumbnail and channel's name
- RelatedVideos: related video list according to the video's Id
- CommentList: reorganizes and displays the data
- CommentAdd: adds the data based on user's input
- Comment: clicks a like button and deletes the data
  <br>

**2. Fetch the Youtube data API (mock data and real data)** <br>
Before getting the real Youtube data API, I would rather have a mock data file so that I don't have to go beyond a per day limit according to Youtube's policy while testing.
([YouTube Data API - Quota and Compliance Audits](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits))

1. Need to get your own API key - [calling the API](https://developers.google.com/youtube/v3/docs)<br>
   Every request must either specify an API key (with the key parameter) or provide an OAuth 2.0 token. Your API key is available in the Developer Console's API Access pane for your project.

2. check the Reference page to get specific APIs and test out the url (HTTP) <br>
   I saved the below URLs' result value into JSON files which can be used as mock data.
   (I recommend using [postman](https://www.postman.com/) to manage and test all API collections)

- Search by keyword<br>
  https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]
  ![parameters](https://user-images.githubusercontent.com/94214512/205221097-bee20ce5-e64f-40a7-89a6-a472c3c1059f.png)

- Popular videos<br>
  https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=[YOUR_API_KEY]

- Related videos<br>
  https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&maxResults=25&key=[YOUR_API_KEY]

- Channels<br>
  https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY]

```js
//context - YoutubeApiContext.jsx

import { createContext, useContext } from "react";
import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";
// import FakeYoutubeClient from "../api/fakeYoutubeClient";

export const YoutubeApiContext = createContext();

// const client = new FakeYoutubeClient(); ---> mock data
const client = new YoutubeClient(); //---> real data
const youtube = new Youtube(client);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
```

```js
// api - youtube.js
export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular(); //private function
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
    // To match up the identical id's value with #mostPopular
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
```

```js
// api - youtubeClient.js
import axios from "axios";

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      //Axios instance
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY }, //object
    });
  }

  async search(params) {
    return this.httpClient.get("search", params);
  }

  async videos(params) {
    return this.httpClient.get("videos", params);
  }
}
```

**3. Use React router's components and hooks like outlet, useParams, useLocation, useNavigate** <br>

- Outlet: An `<Outlet>` should be used in parent route elements to render their child route elements. This allows the nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
  <br>
- useParams: The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the `<Route path>`. Child routes inherit all params from their parent routes.
  <br>
- useLocation: This can be useful if you'd like to perform some side effect whenever the current location changes. (normally use with useNavigate together)
  <br>
- useNavigate: It is similar to `<Link to>`.
  <br>

```js
export default function Videos() {
  const { keyword } = useParams(); //{keyword:'keyword'}
  const { youtube } = useYoutubeApi(); //from YoutubeApiContext

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 1,
  });
  //if there is a keyword then #searchByKeyword(keyword), if not then #mostPopular()
  return (
    <>
      {videos && (
        <h1 className="text-2xl font-semibold mb-4">
          Total video numbers : {videos.length}
        </h1>
      )}
      {isLoading && <p>Loading....</p>}
      {error && <p>something is wrong😥</p>}
      {videos && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
          {videos.map((video) => {
            return <VideoCard key={video.id} video={video}></VideoCard>;
          })}
        </ul>
      )}
    </>
  );
}
```

```js
export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  // How to pass parameters while navigating a page with useNavigate()
  // 1) get useNavigate() 2) send parameters like navigate(/route,{state:{key:value, key:value, ...}})
  const navigate = useNavigate();
  const isList = type === "list";

  return (
    <li
      className={isList ? "flex gap-1 m-2" : ""}
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, { state: { video: video } });
      }}
    >
      <img
        className={isList ? "w-60 mr-2" : "w-full"}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className="font-semibold my-2 line-clamp-2">{title}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
}
```

```js
export default function VideoDetail(){
    //how to get the parameter at the moved route
    // 1) get useLocation(), 2)get a parameter through state.key
    const {state:{video}} = useLocation()
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
}
```

<br>
4. Caching strategy with useQuery<br>
Good to check data status with devtools provided by react-query

- ChannelInfo: Normally the channel's thumbnail doesn't change frequently so I assigned staleTime a value of five minutes
- RelatedVideos: Same as channel thumbnail so I also assigned staleTime a value of five minutes
- Videos: a lot of new videos update on Youtube so I assigned staleTime a value of one minute

```js
export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(
    ["channel", id],
    () => youtube.channelImageURL(id),
    { staleTime: 1000 * 60 * 5 }
  );
}
```

```js
export default function RelatedVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: relatedVideos,
  } = useQuery(["relatedVideos", id], () => youtube.relatedVideos(id), {
    staleTime: 1000 * 60 * 5,
  });
}
```

```js
export default function Videos() {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 1,
  });
}
```

### Reference Links

[My Korean blog about how to use react router](https://blog.naver.com/thvldk0025/222932826787)<br>
[My Korean blog about how to use react query](https://blog.naver.com/thvldk0025/222933548942)<br>
[My Korean blog about difference between axios and fetch, how to use 'get' method](https://blog.naver.com/thvldk0025/222937990606)<br>
[Dream coding](https://academy.dream-coding.com/)<br>
[Tailwind](https://tailwindcss.com/)<br>
[React router](https://reactrouter.com/en/main)<br>
[React query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)<br>
[youtube data api reference](https://developers.google.com/youtube/v3/docs)<br>

### Self-reflection

This project was more difficult than I expected but I enjoyed it a lot.
It really helped me to improve how to read open source materials and documentation as well as get the information that I needed. Even though it took me quite a lot of time to finish due to writing notes whenever I learned a new concept from the official website, I believe it was all worth it. I'm also glad that I could apply the concepts that I learned last time such as darkmode & lightmode and saving data in storage by myself!
However, there is a thing that I still couldn't figure out, which is the comment reply button feature. I feel like it is not that difficult but I had a lot of errors. So I hope to figure it out soon!
