/**
 * Componente Footer - Pie de página
 * 
 * Pie de página con información de marca y copyright.
 * Utiliza Bootstrap para diseño responsivo.
 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

/**
 * Componente de pie de página
 * @returns {JSX.Element} Footer con información de marca
 */
const Footer = () => {
    return (
        <footer className="footer py-4">
            <Container>
                <Row>
                    <Col className="text-center">
                        {/* Título de la marca en el footer */}
                        <h2 className="footer-title mb-2">LIBRIO</h2>
                        {/* Texto de copyright */}
                        <p className="footer-text mb-0">© Librio - Todos los derechos reservados</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;