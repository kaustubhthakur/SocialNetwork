import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import RegisterPage from './pages/registerpage/RegisterPage'
import LoginPage from './pages/loginpage/LoginPage'
import AuthPage from './pages/authpage/AuthPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar/>}/>
      <Route path='/auth' element={<AuthPage/>} />
      {/* <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/login' element={<LoginPage/>} /> */}
    </Routes>
  )
}

export default App