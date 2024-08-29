import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import AddStudent from './components/AddStudent'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/student/add' element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
