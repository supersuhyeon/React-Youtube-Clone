import CommentAdd from "./CommentAdd";
import Comment from "./Comment";
import { useState } from "react";
import { useEffect } from "react";

export default function CommentList(){
    const [comments, setComments] = useState(()=>{return readCommentsFromLocalStorage()})

    const addHandler = (text)=>{
        setComments((comments)=>{return [...comments,text]})
    }

    const deleteHandler = (deleted)=>{
        setComments(comments.filter((comment)=>{return comment.id !== deleted.id}))
    }

    useEffect(()=>{
        localStorage.setItem('comments',JSON.stringify(comments))
    },[comments])

    return(
        <>
        <CommentAdd onAdd={addHandler}></CommentAdd>
        <ul>
            {comments.map((comment)=>{return <Comment key={comment.id} comment={comment} onDelete={deleteHandler}></Comment>})}
        </ul>
        </>
    )
}

function readCommentsFromLocalStorage(){
    const comments = localStorage.getItem('comments')
    return comments? JSON.parse(comments) : []
}