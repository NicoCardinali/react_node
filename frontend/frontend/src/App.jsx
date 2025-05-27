import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/home'
import ProductsList from './views/ProductsList'
import UsersList from './views/UsersList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductsList />} />
        <Route path="/usuarios" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
