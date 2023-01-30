import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes } from "react-router-dom";
import { YoutubeApiContext } from "../context/YoutubeApiContext";

export function withRouter(routes, initalEntry = '/'){
    return <MemoryRouter initialEntries={[initalEntry]}>
        <Routes>
            {routes}
        </Routes>
    </MemoryRouter>
}

export function withAllContexts(children, youtube){
    const testClient = createTestQueryClient()
    return (
        <YoutubeApiContext.Provider value={{youtube}}>
        <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
        </YoutubeApiContext.Provider>
        )
    
}

function createTestQueryClient(){
    return new QueryClient({
        defaultOptions :{
            queries:{retry:false}
        },
        logger:{
            log:console.log,
            warn: console.log,
            error: ()=>{},
        }
    })
}