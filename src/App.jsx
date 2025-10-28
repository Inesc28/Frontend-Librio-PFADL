import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, IniciarSesion, RegistroUsuario } from './assets/views'
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
        
        {/* Ruta para registro de usuario */}
        <Route path="/registro" element={<RegistroUsuario />} />
        
        {/* Ruta para registro de usuario (alternativa) */}
        <Route path="/registrarse" element={<RegistroUsuario />} />
      </Routes>
    </Router>
  )
}

export default App
