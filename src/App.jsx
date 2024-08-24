import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContent from './components/PostContent'
import './App.css'
import { useRecoilValue } from 'recoil'
import Dashboard from './components/Dashboard'
import Loader from './components/Loader'
import { loader } from './atoms'

function App() {
  const loading = useRecoilValue(loader)
  return (
    <BrowserRouter>
        {loading && 
          <div className='loader-container'>
            <Loader />
          </div>
        }
        <Routes>
          <Route path='/post' element={<PostContent />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
