import { useRef, useState } from "react"
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs"

export default function CommentAdd({onAdd}){
    const [text, setText] = useState('')
    const [emojiVisible, setEmojiVisibile] = useState(false)
    const inputRef = useRef()

    const changeHandler = (e)=>{
        setText(e.target.value)
    }

    const submitHandler = (e)=>{
        if(text.trim().length === 0){
            return
        }
        onAdd({id: 2, text:text, username :'sue'})
        setText('')
        inputRef.current.focus()
    }


    const emojiHandler= ()=>{
        setEmojiVisibile((emojiVisible)=>{return !emojiVisible})
    }

    const onEmojiClick = (event, emojiObject)=>{
        setText((text)=>{return text + emojiObject.emoji})
        inputRef.current.focus()
        setEmojiVisibile(false)
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            if(text.trim().length === 0){
                return
            }

            onAdd({id: 2, text:text, username :'sue'});
            setText('')
            inputRef.current.focus()
        }
      }



    return(
        <>
        <div className="flex mb-12">
            <img className="w-10 h-10 rounded-full shadow-lg" src="/img/suhyeon.png" alt="" />
            <div className="ml-3 w-full">
                <input ref={inputRef} className="bg-transparent border-b-2 block w-full focus:outline-none placeholder:text-slate-400" placeholder="comment here..." type="text" onChange={changeHandler} value={text} onKeyPress={handleKeyPress}/>
               
                <div className="flex justify-between">
                    <span>
                    <button onClick={emojiHandler}><BsEmojiSmile className="text-lg mt-1"></BsEmojiSmile></button>
                    <button className={emojiVisible ? 'absolute' : 'hidden' }>
                        <Picker onEmojiClick={onEmojiClick}></Picker>
                    </button>
                    </span>
                  
                    <span>
                    <button className="mr-2" onClick={()=>{return setText('')}}>Delete</button>
                    <button onClick={submitHandler}>Add</button>
                    </span>
                </div>
                
            </div>
           
        </div>
        </>
    )
}