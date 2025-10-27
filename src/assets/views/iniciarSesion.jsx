/**
 * Componente IniciarSesion - Página de inicio de sesión de Librio
 * 
 * Este componente renderiza la página de login de la aplicación Librio.
 * Incluye formulario de autenticación con email y contraseña.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 */

import React, { useState } from 'react';
import {
    Container,    // Contenedor responsivo de Bootstrap
    Row,         // Fila del grid system
    Col,         // Columna del grid system
    Form,        // Formulario de Bootstrap
    Button,      // Botón estilizado
    Card         // Tarjeta contenedora
} from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Para navegación
import { Navbar, Footer } from '../../components';  // Componentes modulares
import './iniciarSesion.css';

/**
 * Componente funcional IniciarSesion
 * @returns {JSX.Element} Página de inicio de sesión de Librio
 */
const IniciarSesion = () => {
    // Estados para manejar los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Maneja el envío del formulario de login
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="login-container">
            {/* ====== BARRA DE NAVEGACIÓN ====== */}
            {/* Componente Navbar modular */}
            <Navbar />

            {/* ====== CONTENIDO PRINCIPAL ====== */}
            <main className="login-main">
                <Container>
                    <Row className="justify-content-center align-items-center min-vh-100" >
                        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                            
                            {/* ====== TARJETA DE LOGIN ====== */}
                            <Card className="login-card">
                                <Card.Body className="p-5">
                                    
                                    {/* Logo centrado */}
                                    <div className="text-center mb-4">
                                        <div className="login-logo">
                                            <img 
                                                src="/images/logo.PNG" 
                                                alt="Librio Logo" 
                                                className="logo-image-large" 
                                            />
                                        </div>
                                    </div>

                                    {/* Título de la página */}
                                    <h2 className="login-title text-center mb-4">
                                        Iniciar Sesión
                                    </h2>

                                    {/* ====== FORMULARIO DE LOGIN ====== */}
                                    <Form onSubmit={handleSubmit}>
                                        
                                        {/* Campo Email */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="login-label">
                                                Email
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder=""
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="login-input"
                                                required
                                            />
                                        </Form.Group>

                                        {/* Campo Contraseña */}
                                        <Form.Group className="mb-4">
                                            <Form.Label className="login-label">
                                                Contraseña
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder=""
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="login-input"
                                                required
                                            />
                                        </Form.Group>

                                        {/* Botón de Iniciar Sesión */}
                                        <div className="d-grid mb-4">
                                            <Button 
                                                type="submit" 
                                                className="login-button"
                                                size="lg"
                                            >
                                                Iniciar Sesión
                                            </Button>
                                        </div>

                                        {/* Link de registro */}
                                        <div className="text-center">
                                            <p className="register-text">
                                                ¿No tienes una cuenta?{' '}
                                                <Link to="/registro" className="register-link">
                                                    Regístrate
                                                </Link>
                                            </p>
                                        </div>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>

            {/* ====== FOOTER ====== */}
            {/* Componente Footer modular */}
            <Footer />
        </div>
    );
};

// Exportación por defecto del componente
export default IniciarSesion;