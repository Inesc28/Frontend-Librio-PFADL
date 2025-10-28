/**
 * Componente RegistroUsuario - Página de registro de nuevos usuarios
 * 
 * Este componente renderiza la página de registro de la aplicación Librio.
 * Incluye formulario de registro con nombre completo, email y contraseña.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 * Mantiene consistencia visual con la página de inicio de sesión.
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
import { Navbar, Footer } from '../../../components';  // Componentes modulares
import './RegistroUsuario.css';

/**
 * Componente funcional RegistroUsuario
 * @returns {JSX.Element} Página de registro de usuarios de Librio
 */
const RegistroUsuario = () => {
    
    // ====== ESTADO DEL FORMULARIO ======
    // Estados para manejar los valores de los campos del formulario
    const [nombreCompleto, setNombreCompleto] = useState('');  // Campo nombre completo
    const [email, setEmail] = useState('');                    // Campo email
    const [password, setPassword] = useState('');              // Campo contraseña

    /**
     * Maneja el envío del formulario de registro
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevenir comportamiento por defecto
        
        // TODO: Implementar lógica de registro
        console.log('Datos de registro:', {
            nombreCompleto,
            email,
            password
        });
        
        // TODO: Conectar con API de registro
        // TODO: Manejar respuesta del servidor
        // TODO: Redirigir al usuario tras registro exitoso
    };

    return (
        <>
            {/* ====== NAVEGACIÓN ====== */}
            <Navbar />
            
            {/* ====== CONTENIDO PRINCIPAL ====== */}
            <div className="registro-container">
                <main className="registro-main">
                    <Container>
                        <Row className="justify-content-center">
                            
                            {/* Columna centrada con diferentes tamaños según breakpoint */}
                            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                            
                                {/* ====== TARJETA DE REGISTRO ====== */}
                                <Card className="registro-card">
                                    <Card.Body className="p-5">
                                        
                                        {/* Logo centrado */}
                                        <div className="text-center mb-4">
                                            <div className="registro-logo">
                                                <img 
                                                    src="/images/logo.PNG" 
                                                    alt="Librio Logo" 
                                                    className="logo-image-large" 
                                                />
                                            </div>
                                        </div>

                                        {/* Título de la página */}
                                        <h2 className="registro-title text-center mb-4">
                                            Regístrate
                                        </h2>

                                        {/* ====== FORMULARIO DE REGISTRO ====== */}
                                        <Form onSubmit={handleSubmit}>
                                            
                                            {/* Campo Nombre Completo */}
                                            <Form.Group className="mb-3">
                                                <Form.Label className="registro-label">
                                                    Nombre Completo
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    value={nombreCompleto}
                                                    onChange={(e) => setNombreCompleto(e.target.value)}
                                                    className="registro-input"
                                                    required
                                                />
                                            </Form.Group>

                                            {/* Campo Email */}
                                            <Form.Group className="mb-3">
                                                <Form.Label className="registro-label">
                                                    Email
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder=""
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="registro-input"
                                                    required
                                                />
                                            </Form.Group>

                                            {/* Campo Contraseña */}
                                            <Form.Group className="mb-4">
                                                <Form.Label className="registro-label">
                                                    Contraseña
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder=""
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="registro-input"
                                                    required
                                                />
                                            </Form.Group>

                                            {/* Botón de Registrarse */}
                                            <div className="d-grid mb-4">
                                                <Button 
                                                    type="submit" 
                                                    className="registro-button"
                                                    size="lg"
                                                >
                                                    Registrarse
                                                </Button>
                                            </div>

                                            {/* Link de inicio de sesión */}
                                            <div className="text-center">
                                                <p className="login-text">
                                                    ¿Tienes una cuenta?{' '}
                                                    <Link to="/iniciar-sesion" className="login-link">
                                                        Inicia Sesión
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
            </div>

            {/* ====== FOOTER ====== */}
            {/* Componente Footer modular */}
            <Footer />
        </>
    );
};

// Exportación por defecto del componente
export default RegistroUsuario;