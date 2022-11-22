import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NotFound from './pages/NotFound'
import Videos from './pages/Videos'
import VideoDetail from './pages/VideoDetail'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    errorElement : <NotFound></NotFound>,
    children : [
      {index: true, element: <Videos></Videos>}, //인덱스가 최상위인경우 비디오 목록을 보여준다
      {path: "/videos", element : <Videos></Videos>}, //사용자가 명시적으로 videos라고 한경우에도 videos페이지 컴포넌트 보여줌
      {path: "/videos/:keyword", element: <Videos></Videos>}, //videos다음에 특정한 키워드로 검색한 경우에도 videos페이지 컴포넌트, 키워드 파람이 없으면 핫트렌딩
      {path: "/videos/watch/:videoId", element: <VideoDetail></VideoDetail>},// 사용자가 비디오를 클릭했을때 watch경로안에 비디오 아이디가 전달되면 상세를 보여줌
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
