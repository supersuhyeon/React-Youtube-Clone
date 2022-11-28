import CommentAdd from "./CommentAdd";
import Comment from "./Comment";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid'

export default function CommentList(){
    const [comments, setComments] = useState([{id: uuidv4(), text:'Such a nice video😍', username :'sue'}])

    const addHandler = (text)=>{
        setComments((comments)=>{return [...comments,text]})
    }

    const deleteHandler = (deleted)=>{
        setComments(comments.filter((comment)=>{return comment.id !== deleted.id}))
    }

    return(
        <>
        <CommentAdd onAdd={addHandler}></CommentAdd>
        <ul>
            {comments.map((comment)=>{return <Comment key={comment.id} comment={comment} onDelete={deleteHandler}></Comment>})}
        </ul>
        </>
    )
}