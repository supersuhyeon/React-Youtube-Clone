import { useRef, useState, useEffect  } from "react"
import { AiOutlineLike, AiFillLike} from "react-icons/ai"

export default function Comment({comment, onDelete}){
    const [isLiked, setIsLiked] = useState(false)

    const likedHandler = ()=>{
        setIsLiked((isLiked)=>{return !isLiked})
    }

    const liRef = useRef()
    useEffect(()=>{
        liRef.current.scrollIntoView({behavior: 'smooth', block:'end'})
    },[comment])

    const deleteHandler = ()=>{
        onDelete(comment)
    }

    return(
        <>
            <li className="flex mb-3" ref={liRef}>
                <div className="mr-3">
                    <img className="w-10 h-10 rounded-full shadow-lg" src="/img/suhyeon.png" alt="" />
                </div>
               
                <div className="mb-4">
                    <p className="font-bold">{comment.username}</p>
                    <p>{comment.text}</p>
    
                    <div className="flex flex-row items-center mt-1">
                    <button className="mr-1" onClick={likedHandler}>
                        {!isLiked && <AiOutlineLike></AiOutlineLike>}
                        {isLiked && <AiFillLike></AiFillLike>}
                    </button>
    
                   {isLiked && <span className="mr-2 text-xs">1</span>}
    
                    <button className="text-xs mr-2 bg-slate-400 rounded-full px-2">Reply</button>
                    <button className="text-xs bg-red-400 rounded-full px-2" onClick={deleteHandler}>Delete</button>
                    </div>
                </div>
            </li>    
        </>
    )
}