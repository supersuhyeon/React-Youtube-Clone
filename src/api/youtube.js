
export default class Youtube{
    constructor(apiClient){
        this.apiClient = apiClient
        }

    async search(keyword){
        return keyword? this.#searchByKeyword(keyword) : this.#mostPopular() //private 함수 클래스 외부에서는 호출불가능
    };

    async channelImageURL(id){
        return this.apiClient.channels({params:{part :'snippet',id:id}})
        .then((res)=>res.data.items[0].snippet.thumbnails.default.url)
    }

    async relatedVideos(id){
        return this.apiClient.search({
            params: {
                part:'snippet',
                maxResults : 25,
                type:'video',
                relatedToVideoId :id
              },
        })
        .then((res) => res.data.items.map((item)=>({...item, id:item.id.videoId})))
    }

    async #searchByKeyword(keyword){
        return this.apiClient
        .search({
            params: {
              part:'snippet',
              maxResults : 25,
              type:'video',
              q: keyword
            },
        })
        .then((res) => res.data.items)
        .then(items => items.map((item)=>({...item, id:item.id.videoId}))) //popular과 동일한 데이터 문자열로 맞춰주기
    }

    async #mostPopular(){
        return this.apiClient
        .videos({
            params: {
                part:'snippet',
                maxResults:25,
                chart:'mostPopular',
            }, 
        })
        .then((res) => res.data.items)
    }
}