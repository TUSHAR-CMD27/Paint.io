import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './assets/components/Landing'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Explore from './assets/components/Explore'
import Contact from './assets/components/Contact'
import Login from './assets/components/Login'
import Signup from './assets/components/Signup'
import CreatePost from './assets/components/CreatePost'
import { AuthProvider, useAuth } from './context/AuthContext'
//import { Link } from 'react-router-dom'

function AppContent() {
  const { user } = useAuth();
  const handleAddPost = ()=>{
    <Link to="/Login"></Link>
  }

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
      <CreatePost onAdd={handleAddPost} />
      <Footer/>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
