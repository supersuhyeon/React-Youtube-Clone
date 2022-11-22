import { useParams } from "react-router-dom"

export default function Videos(){

    const {keyword} = useParams()

    return(
        <div>Videos : { keyword ? `${keyword}` : 'Hot trend video list ❤️‍🔥' }</div>
    )
}