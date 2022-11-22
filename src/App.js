import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Outlet} from 'react-router-dom'
import SearchHeader from './components/SearchHeader';


const queryClient = new QueryClient()

function App() {
  return (
    <>
    <SearchHeader></SearchHeader>
    <QueryClientProvider client={queryClient}>
    <Outlet></Outlet>
    </QueryClientProvider>
    
    </>
  );
}

export default App;
