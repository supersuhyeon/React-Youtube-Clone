import axios from 'axios'

export default class FakeYoutubeClient{

    async search({params}){
        const isRelated = params.relatedToVideoId
        return axios.get(`/videos/${isRelated ? 'related' : 'search'}.json`)
    }

    async videos(){
        return axios.get('/videos/popular.json')
    }
    async channels(){
        return axios.get('/videos/channel.json')
    }
}