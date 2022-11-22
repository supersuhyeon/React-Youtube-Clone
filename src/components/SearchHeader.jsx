import { useEffect } from 'react';
import { useState } from 'react'
import {BsSearch, BsYoutube} from 'react-icons/bs'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

export default function SearchHeader(){
    const {keyword} = useParams();
 
    const [text, setText] = useState('')
    const navigate = useNavigate()
    
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        navigate(`/videos/${text}`)
        
    }

    useEffect(()=>{
        return setText(keyword || '')
    },[keyword])

    return(
        <header>
            <Link to='/'>
                <BsYoutube></BsYoutube>
                <h1>Youtube</h1>
            </Link>
            <form onSubmit={onSubmitHandler}>
                <input type="text" placeholder='Search...' value={text} onChange={(e)=>{return setText(e.target.value)}}/>
                <button><BsSearch></BsSearch></button>
            </form>
        </header>
    )
}