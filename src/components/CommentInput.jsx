import { useState } from "react"

export default function CommentInput(){

    const [text, setText] = useState('')
    const handleChange = (e)=>{
        setText(e.target.value)
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        setText('')
    }

    return(
        <>
        <form onSubmit={submitHandler}>
            <input type="text" placeholder="add comment..." value={text} onChange={handleChange}/>
            <button>add</button>
        </form>
        </>
    )
}