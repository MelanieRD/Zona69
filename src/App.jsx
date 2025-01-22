import { useState } from 'react'
import './App.css'
import { Nav } from './assets/components/Nav/Nav'
import { Home } from './assets/pages/Home/Home'
import { Shop } from './assets/pages/Shop/Shop'
import { Route, Routes } from 'react-router-dom'

function App() {
 
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  
    </>
  )
}

export default App
