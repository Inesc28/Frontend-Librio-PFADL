import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, IniciarSesion, RegistroUsuario, MiPerfil, Publicar, Galeria, Detalles } from './assets/views'
import { LibrosProvider } from './context/LibrosContext'
import './App.css'

function App() {
  return (
    <LibrosProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/registrarse" element={<RegistroUsuario />} />
          <Route path="/mi-perfil" element={<MiPerfil />} />
          <Route path="/perfil" element={<MiPerfil />} />
          <Route path="/publicar" element={<Publicar />} />
          <Route path="/vender" element={<Publicar />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/libros" element={<Galeria />} />
          <Route path="/detalles/:id" element={<Detalles />} />
          
        </Routes>
      </Router>
    </LibrosProvider>
  )
}

export default App
