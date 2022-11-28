import { useEffect, useRef, useState } from "react"
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai"
import CommentAdd from "./CommentAdd"

export default function Comment({comment}){
    const [isLiked, setIsLiked] = useState(false)

    const likedHandler = ()=>{
        setIsLiked((isLiked)=>{return !isLiked})
    }

    const [disLiked, setDisIsLiked] = useState(false)

    const dislikedHandler = ()=>{
            setDisIsLiked((disLiked)=>{return !disLiked})
        }


    const liRef = useRef()

    useEffect(()=>{
        liRef.current.scrollIntoView({behavior: 'smooth', block:'end'})
    },[comment])

    const [clickedReply, setClickedReply] = useState(false)

    return(
        <>
        <li className="flex" ref={liRef}>
            <div className="mr-3">
                <img className="w-10 h-10 rounded-full shadow-lg" src="/img/suhyeon.png" alt="" />
            </div>
           
            <div className="mb-4">
                <p className="font-bold">{comment.username}</p>
                <p>{comment.text}</p>

                <button className="mr-1" onClick={likedHandler}>
                    {!isLiked && <AiOutlineLike></AiOutlineLike>}
                    {isLiked && <AiFillLike></AiFillLike>}
                </button>

                <button className="mr-1" onClick={dislikedHandler}>
                    {!disLiked && <AiOutlineDislike></AiOutlineDislike>}
                    {disLiked && <AiFillDislike></AiFillDislike>}
                </button>

                <button className="text-sm" onClick={()=>{return setClickedReply((clickedReply)=>{return !clickedReply})}}>Reply</button>
                {clickedReply && <CommentAdd></CommentAdd>}
            </div>
        </li>
        </>
    )
}