import CommentAdd from "./CommentAdd";
import Comment from "./Comment";
import { useState } from "react";

export default function CommentList(){
    const [comments, setComments] = useState([{id: 1, text:'hello', username :'sue'}])

    const addHandler = (text)=>{
        setComments((comments)=>{return [...comments, text]})
    }

    return(
        <>
        <CommentAdd onAdd={addHandler}></CommentAdd>
        <ul>
            {comments.map((comment)=>{return <Comment key={comment.id} comment={comment}></Comment>})}
        </ul>
        </>
    )
}