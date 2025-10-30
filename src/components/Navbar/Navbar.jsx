/**
 * Componente Navbar - Barra de navegación principal
 * 
 * Barra de navegación responsiva con menú hamburguesa para móviles.
 * Incluye logo, marca y enlaces de navegación principales.
 */

import React, { useState } from 'react';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLibros } from '../../context/LibrosContext';
import './Navbar.css';

/**
 * Componente de barra de navegación
 */
const CustomNavbar = () => {

  // ====== CONTEXTO DEL CARRITO ======
  const { obtenerCantidadTotalCarrito } = useLibros();
  const cantidadCarrito = obtenerCantidadTotalCarrito();

  // ====== ESTADO DE AUTENTICACIÓN ======
  // TODO: Este estado debería venir de un contexto de autenticación global
  // Por ahora usamos un estado local para demostración
  // TESTING: Cambiar a 'true' para ver las opciones de usuario autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  /**
   * Maneja el cierre de sesión
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    // TODO: Limpiar datos de sesión
    // TODO: Redirigir a página de inicio
    console.log('Cerrando sesión...');
  };

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        {/* Logo y marca de la aplicación */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="logo-icon me-2">
            {/* Logo cargado desde carpeta public/images */}
            <img src="/images/logo.PNG" alt="Librio Logo" className="logo-image" />
          </div>
          <span className="logo-text">LIBRIO</span>
        </Navbar.Brand>

        {/* Botón hamburguesa para móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Menú de navegación colapsable */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* Enlace "Inicio" siempre visible */}
            <Nav.Link as={Link} to="/" className="custom-nav-link">Inicio</Nav.Link>

            {/* ====== OPCIONES PARA USUARIOS NO AUTENTICADOS ====== */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/registro" className="custom-nav-link">
                  Registrate
                </Nav.Link>
                <Nav.Link as={Link} to="/iniciar-sesion" className="custom-nav-link">
                  Iniciar Sesión
                </Nav.Link>
              </>
            )}

            {/* ====== OPCIONES PARA USUARIOS AUTENTICADOS ====== */}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/galeria" className="custom-nav-link">
                  Galería
                </Nav.Link>
                <Nav.Link as={Link} to="/carrito" className="custom-nav-link position-relative">
                  Carrito
                  {/* Badge que muestra la cantidad de items en el carrito */}
                  {cantidadCarrito > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="position-absolute top-0 start-100 translate-middle carrito-badge"
                    >
                      {cantidadCarrito > 99 ? '99+' : cantidadCarrito}
                    </Badge>
                  )}
                </Nav.Link>
                <Nav.Link as={Link} to="/publicar" className="custom-nav-link">
                  Publicar
                </Nav.Link>
                <Nav.Link
                  href="#cerrar-sesion"
                  className="custom-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Cerrar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/mi-perfil" className="custom-nav-link">
                  {/* Icono de perfil de usuario */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: '20px', height: '20px' }}
                    title="Mi Perfil"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;