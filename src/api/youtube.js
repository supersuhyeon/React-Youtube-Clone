import axios from 'axios'

export default class Youtube{
    constructor(){
        this.httpClient = axios.create({
            baseURL: 'https://www.googleapis.com/youtube/v3',
            params: {key: process.env.REACT_APP_YOUTUBE_API_KEY}
        })
      
    }

    async search(keyword){
        return keyword? this.#searchByKeyword(keyword) : this.#mostPopular() //private 함수 클래스 외부에서는 호출불가능
    };

    async #searchByKeyword(keyword){
        return this.httpClient
        .get('search', {params: {
            part:'snippet',
            maxResults : 25,
            type:'video',
            q: keyword
        }})
        .then((res) => res.data.items)
        .then(items => items.map((item)=>({...item, id:item.id.videoId}))) //popular과 동일한 데이터 문자열로 맞춰주기
    }

    async #mostPopular(){
        return this.httpClient
        .get('videos', {params: {
            part:'snippet',
            maxResults:25,
            chart:'mostPopular',
        }
    })
    .then((res) => res.data.items)
    }
}