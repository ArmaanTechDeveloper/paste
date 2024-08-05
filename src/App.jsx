import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContent from './components/PostContent'
import './App.css'
import { RecoilRoot } from 'recoil'
import Dashboard from './components/Dashboard'

function App() {
  
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/post' element={<PostContent />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
