import { MdDarkMode, MdLightMode } from "react-icons/md"
import { useLightMode } from "../context/LightModeContext"

export default function ThemeModeBtn(){
    const {lightMode, toggleLightMode} = useLightMode()
    const handleLightMode = ()=>{toggleLightMode()}

    return(
        <>
        {lightMode && <button className='flex items-center text-lg border-2 border-none rounded-full px-3 py-2 fixed right-5 bottom-8 bg-white text-black shadow-lg hover:bg-gray-800 hover:text-white' onClick={handleLightMode}><MdDarkMode></MdDarkMode>DarkMode</button>}
        {!lightMode && <button className='flex items-center text-lg border-2 border-none rounded-full px-3 py-2 fixed right-5 bottom-8 bg-zinc-800 text-white shadow-lg  hover:bg-zinc-300 hover:text-black' onClick={handleLightMode}><MdLightMode></MdLightMode>LightMode</button>}
        </>
    )
}