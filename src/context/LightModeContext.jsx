import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const LightModeContext = createContext(null)

export function LightModeProvider({children}){
    const [lightMode, setLightMode] = useState(false)
    const toggleLightMode = ()=>{
        setLightMode((lightMode)=>{return !lightMode})
        updateLightMode(!lightMode)
    }

      useEffect(()=>{ 
        const isLight = 
        localStorage.theme === 'light' || 
        (!('theme' in localStorage) && 
        window.matchMedia('(prefers-color-scheme: light)').matches)

        setLightMode(isLight) 
        updateLightMode(isLight) 
    },[])

    return(
        <LightModeContext.Provider value={{lightMode, toggleLightMode}}>
            {children}
        </LightModeContext.Provider>
    )
}

function updateLightMode(lightMode){
    if(lightMode){
        document.body.classList.add('light')
        localStorage.theme = 'light'
    }else{
        document.body.classList.remove('light')
        localStorage.theme = 'dark'
    }
}

export const useLightMode = ()=> useContext(LightModeContext)