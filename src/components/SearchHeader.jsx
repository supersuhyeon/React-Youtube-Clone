import { useEffect } from 'react';
import { useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import {FiMenu} from 'react-icons/fi'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {HiHome} from 'react-icons/hi'
import {AiFillYoutube} from 'react-icons/ai'
import {MdVideoLibrary, MdOutlineSubscriptions} from 'react-icons/md'
import {RiMovieLine} from 'react-icons/ri'

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

    const handleToggleClick = ()=>{
        const navbar = document.querySelector('.navbar')
        navbar.classList.toggle('expander')
    }

    return(
        <>
            <div className='navbar fixed top-0 left-0 h-full bg-zinc-900 text-white pt-6 px-6 pb-8 ease-in-out duration-300 z-50'>
            <div className='h-full flex flex-col overflow-hidden'>
                <div className='grid grid-cols-[max-content_1fr] justify-items-end items-center mb-10 p-3'>
                    <FiMenu className='nav-toggle' onClick={handleToggleClick}></FiMenu>
                    <div className='ml-4 font-bold'>
                        <Link to='/' className='flex items-center'>
                        <AiFillYoutube className="text-red-600 text-2xl"></AiFillYoutube>
                        <p className='ml-1'>Youtube</p>
                        </Link>
                    </div>
                </div>
               <ul>
                    <Link to='/'>
                    <li className='grid grid-cols-[max-content_1fr] items-center gap-4 p-3 text-white rounded mb-4 transition-all hover:bg-slate-400'>
                        <HiHome></HiHome>
                        <p>Home</p>
                    </li>
                    </Link>
                    <li className='grid grid-cols-[max-content_1fr] items-center gap-4 p-3 text-white rounded mb-4 transition-all hover:bg-slate-400'>
                        <RiMovieLine></RiMovieLine>
                        <p>Shorts</p>
                    </li>
                    <li className='grid grid-cols-[max-content_1fr] items-center gap-4 p-3 text-white rounded mb-4 transition-all hover:bg-slate-400'>
                        <MdOutlineSubscriptions></MdOutlineSubscriptions>
                        <p>Subscribe</p>
                    </li>
                    <li className='grid grid-cols-[max-content_1fr] items-center gap-4 p-3 text-white rounded mb-4 transition-all hover:bg-slate-400'>
                        <MdVideoLibrary></MdVideoLibrary>
                        <p>Playlist</p>
                    </li>
               </ul>
            </div>
            </div>

            <div className='fixed top-3 right-3 z-30'>
                <form className='relative' onSubmit={onSubmitHandler}>
                <input
                className='w-32 p-2 outline-none bg-black text-gray-50 focus:w-52 transition-all shadow-2xl'
                type='text'
                placeholder='Search...'
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <button className='absolute top-0 bottom-0 right-2'>
                    <BsSearch className='text-gray-50' />
                </button>
                </form>
            </div>
        </>
    )
}