import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './assets/views/home'
import IniciarSesion from './assets/views/iniciarSesion'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Página de inicio */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para iniciar sesión */}
        <Route path="/login" element={<IniciarSesion />} />
        
        {/* Ruta para iniciar sesión (español) */}
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
      </Routes>
    </Router>
  )
}

export default App
