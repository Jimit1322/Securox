import { useState } from 'react'
import Navbar from './components/Navbar'
import MyManager from './components/MyManager'
import Footer from './components/Footer'
import './App.css'

function App() {
  

  return (
    <>
    <Navbar/>
    <div className="min-h-[67vh]">
    <MyManager/>
    </div>
   
    <Footer/>
  
    </>
  )
}

export default App
