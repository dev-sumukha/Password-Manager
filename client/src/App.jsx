import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AddPassword from './pages/AddPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import Passwords from './pages/Passwords'
import Logout from './pages/Logout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/passwords' element={<Passwords />} />
          {/* <Route path='/addPassword' element={<AddPassword/>} /> */}
          <Route path='/login' element={<Login/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App