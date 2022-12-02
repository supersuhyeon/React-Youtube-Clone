import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Outlet} from 'react-router-dom'
import SearchHeader from './components/SearchHeader';
import { YoutubeApiProvider } from './context/YoutubeApiContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LightModeProvider } from './context/LightModeContext';
import ThemeModeBtn from './components/ThemeModeBtn';


const queryClient = new QueryClient()

function App() {
  return (
    <>
    <LightModeProvider>
      <SearchHeader></SearchHeader>
        <YoutubeApiProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
      <Outlet></Outlet>
      <ThemeModeBtn></ThemeModeBtn>
          </QueryClientProvider>
        </YoutubeApiProvider>
    </LightModeProvider>
    
    </>
  );
}

export default App;
