import axios from 'axios'

export default class FakeYoutube{
    constructor(){

    }

    async search(keyword){
        return keyword? this.#searchByKeyword(keyword) : this.#mostPopular() //private 함수 클래스 외부에서는 호출불가능
    };

    async #searchByKeyword(){
        return axios.get(`/videos/search.json`)
    .then((res) => res.data.items)
    .then(items => items.map((item)=>({...item, id:item.id.videoId}))) //popular과 동일한 데이터 문자열로 맞춰주기
    }

    async #mostPopular(){
        return axios.get(`/videos/search.json`)
    .then((res) => res.data.items)
    }
}