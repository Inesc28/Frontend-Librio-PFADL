import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, IniciarSesion, RegistroUsuario, MiPerfil } from './assets/views'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        
   
        <Route path="/login" element={<IniciarSesion />} />
        
       
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        
      
        <Route path="/registro" element={<RegistroUsuario />} />
        
       
        <Route path="/registrarse" element={<RegistroUsuario />} />
        
       
        <Route path="/mi-perfil" element={<MiPerfil />} />
        
      
        <Route path="/perfil" element={<MiPerfil />} />
      </Routes>
    </Router>
  )
}

export default App
