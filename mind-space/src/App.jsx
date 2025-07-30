import NavBar from './layouts/NavBar'
import Home from './pages/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Quotes from './pages/Quotes'
import MoodTracker from './pages/MoodTracker'
import Journal from './pages/Journal'
import './App.css'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes/>} />
          <Route path="/mood-tracker" element={<MoodTracker/>} />
          <Route path="/journal" element={<Journal/>} />
        </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
