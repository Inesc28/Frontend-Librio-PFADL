/**
 * Componente Home - Página principal de Librio
 * 
 * Este componente renderiza la página de inicio de la aplicación Librio,
 * incluyendo sección hero y galería de libros.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 */

import React from 'react';
import {
    Container,    // Contenedor responsivo de Bootstrap
    Button,      // Botón estilizado
    Row,         // Fila del grid system
    Col,         // Columna del grid system
    Image        // Componente de imagen responsiva
} from 'react-bootstrap';
import { Navbar, Footer } from '../../components';  // Componentes modulares
import './home.css';

/**
 * Componente funcional Home
 * @returns {JSX.Element} Página principal de Librio
 */
const Home = () => {
    return (
        <div className="home-container">
            {/* ====== BARRA DE NAVEGACIÓN ====== */}
            {/* Componente Navbar modular */}
            <Navbar />

            {/* ====== SECCIÓN HERO ====== */}
            {/* 
                Sección principal con mensaje de bienvenida y call-to-action
                - hero-section: Clase CSS para estilos personalizados
            */}
            <section className="hero-section">
                <Container>
                    {/* Grid responsivo centrado */}
                    <Row className="justify-content-center text-center">
                        {/* 
                            Columna responsiva:
                            - lg={10}: 10/12 columnas en pantallas grandes
                            - xl={8}: 8/12 columnas en pantallas extra grandes
                        */}
                        <Col lg={10} xl={8}>
                            {/* Título principal de la aplicación */}
                            <h1 className="hero-title">
                                "Encuentra tu próxima gran lectura. Donde cada libro tiene una nueva historia que contar."
                            </h1>

                      
                            <Button size="lg" className="cta-button">
                                Empezar
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ====== GALERÍA DE LIBROS ====== */}
            {/* 
                Sección que muestra una galería visual de libros
                - books-gallery: Clase CSS para fondo con gradiente
                - py-5: Padding vertical de Bootstrap (3rem top/bottom)
            */}
            <section className="books-gallery py-5">
                <Container>
                    {/* 
                        Grid responsivo con gap entre elementos
                        - g-3: Gap de 1rem entre columnas
                    */}
                    <Row className="g-3">

                        {/* ===== PRIMERA FILA ===== */}
                        {/* Imagen grande - Estantería 1 */}
                        <Col lg={8} md={6} xs={12}>
                            <Image
                                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Estantería de libros"
                                className="shelf-image w-100"
                                fluid    // Hace la imagen responsiva
                                rounded  // Bordes redondeados
                            />
                        </Col>

                        {/* Imagen pequeña - Estantería 2 */}
                        <Col lg={4} md={6} xs={12}>
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Estantería de libros"
                                className="shelf-image w-100"
                                fluid
                                rounded
                            />
                        </Col>

                        {/* ===== SEGUNDA FILA - TRES IMÁGENES ===== */}
                        {/* Pila de libros izquierda */}
                        <Col lg={4} md={4} xs={12}>
                            <Image
                                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Pila de libros"
                                className="stack-image w-100"
                                fluid
                                rounded
                            />
                        </Col>

                        {/* Libro abierto central - Imagen destacada */}
                        <Col lg={4} md={4} xs={12}>
                            <Image
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Libro abierto"
                                className="center-book w-100"  // Clase especial para imagen central
                                fluid
                                rounded
                            />
                        </Col>

                        {/* Pila de libros derecha */}
                        <Col lg={4} md={4} xs={12}>
                            <Image
                                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Pila de libros"
                                className="stack-image w-100"
                                fluid
                                rounded
                            />
                        </Col>

                        {/* ===== TERCERA FILA - DOS IMÁGENES ===== */}
                        {/* Imagen grande - Estantería 3 */}
                        <Col lg={8} md={6} xs={12}>
                            <Image
                                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Estantería de libros"
                                className="shelf-image w-100"
                                fluid
                                rounded
                            />
                        </Col>

                        {/* Imagen pequeña - Estantería 4 */}
                        <Col lg={4} md={6} xs={12}>
                            <Image
                                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Estantería de libros"
                                className="shelf-image w-100"
                                fluid
                                rounded
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ====== FOOTER ====== */}
            {/* Componente Footer modular */}
            <Footer />
        </div>
    );
};

// Exportación por defecto del componente
export default Home;
