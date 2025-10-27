/**
 * Componente Navbar - Barra de navegación principal
 * 
 * Barra de navegación responsiva con menú hamburguesa para móviles.
 * Incluye logo, marca y enlaces de navegación principales.
 */

import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Componente de barra de navegación
 * @returns {JSX.Element} Navbar responsiva
 */
const CustomNavbar = () => {
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
                        <Nav.Link as={Link} to="/" className="custom-nav-link">Inicio</Nav.Link>
                        <Nav.Link href="#registro" className="custom-nav-link">Registrate</Nav.Link>
                        <Nav.Link as={Link} to="/iniciar-sesion" className="custom-nav-link">Iniciar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;