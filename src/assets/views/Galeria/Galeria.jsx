/**
 * Componente Galeria - Vista de productos para usuarios autenticados
 * 
 * Este componente renderiza la galería de libros publicados por los usuarios
 * en la plataforma Librio. Solo accesible para usuarios autenticados.
 * Muestra los productos en formato de grid responsivo con información básica.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 * Integrado con React Context para recibir datos dinámicos desde la API.
 */

import React, { useEffect } from 'react';
import {
  Container,    // Contenedor responsivo de Bootstrap
  Row,         // Fila del grid system
  Col,         // Columna del grid system
  Card,        // Tarjeta contenedora
  Button,      // Botón estilizado
  Badge,       // Etiqueta para precio
  Spinner      // Spinner de carga
} from 'react-bootstrap';
import { Navbar, Footer } from '../../../components';  // Componentes modulares
import { useLibros } from '../../../context/LibrosContext';  // Hook del contexto
import './Galeria.css';

/**
 * Componente funcional Galeria
 * @returns {JSX.Element} Página de galería de libros para usuarios autenticados
 */
const Galeria = () => {

  // ====== CONTEXTO DE LIBROS ======
  const { 
    libros, 
    isLoading, 
    error, 
    obtenerLibros
  } = useLibros();

  // ====== CARGAR DATOS AL MONTAR EL COMPONENTE ======
  /**
   * Efecto para obtener los libros al cargar la galería
   */
  useEffect(() => {
    obtenerLibros();
  }, [obtenerLibros]);

  /**
   * Formatea el precio en formato de moneda colombiana
   * @param {number} precio - El precio numérico
   * @returns {string} El precio formateado
   */
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  /**
   * Maneja el clic en el botón "Ver Detalles"
   * @param {string} libroId - ID del libro seleccionado
   */
  const handleVerDetalles = (libroId) => {
    // TODO: Implementar navegación a página de detalles del libro
    console.log('Ver detalles del libro ID:', libroId);
  };

  return (
    <>
      {/* ====== NAVEGACIÓN ====== */}
      <Navbar />

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <div className="galeria-container">
        <main className="galeria-main">
          <Container>

            {/* ====== TÍTULO DE LA PÁGINA ====== */}
            <Row className="mb-5">
              <Col>
                <h1 className="galeria-title text-center">
                  Galería de Libros
                </h1>
                <p className="galeria-subtitle text-center">
                  Descubre los libros disponibles en nuestra comunidad
                </p>
              </Col>
            </Row>

            {/* ====== ESTADO DE CARGA ====== */}
            {isLoading && (
              <Row className="mt-5">
                <Col>
                  <div className="galeria-loading text-center">
                    <Spinner animation="border" variant="light" />
                    <p className="mt-3">Cargando libros...</p>
                  </div>
                </Col>
              </Row>
            )}

            {/* ====== ESTADO DE ERROR ====== */}
            {error && (
              <Row className="mt-5">
                <Col>
                  <div className="galeria-error text-center">
                    <h4 className="text-danger">Error al cargar libros</h4>
                    <p className="text-light">{error}</p>
                    <Button
                      variant="outline-light"
                      onClick={obtenerLibros}
                    >
                      Reintentar
                    </Button>
                  </div>
                </Col>
              </Row>
            )}

            {/* ====== CONTENEDOR CON FONDO PARA LAS CARDS ====== */}
            {!isLoading && !error && (
              <div className="galeria-cards-container">
                <Row className="justify-content-center g-3">
                  {libros.map((libro) => (
                    <Col key={libro.id} xs={12} sm={6} md={4} lg={4}>

                    {/* ====== TARJETA DE LIBRO ESTILO NUEVO ====== */}
                    <Card className="galeria-card-nueva">

                      {/* Contenedor de imagen del libro */}
                      <div className="galeria-imagen-nueva">
                        <Card.Img
                          src={libro.urlImagen}
                          alt={`Portada de ${libro.titulo}`}
                          className="galeria-img"
                          onError={(e) => {
                            // Imagen por defecto si falla la carga
                            e.target.src = 'https://via.placeholder.com/300x400/8b5a8c/ffffff?text=Sin+Imagen';
                          }}
                        />
                        
                        {/* Overlay con información */}
                        <div className="galeria-overlay">
                          
                          {/* Título del libro centrado */}
                          <h3 className="galeria-titulo-nuevo">
                            {libro.titulo}
                          </h3>
                          
                          {/* Precio destacado */}
                          <div className="galeria-precio-nuevo">
                            ${libro.precio}
                          </div>
                          
                          {/* Botón Ver más */}
                          <Button 
                            className="galeria-btn-ver-mas"
                            onClick={() => handleVerDetalles(libro.id)}
                          >
                            Ver más
                          </Button>
                          
                        </div>
                      </div>

                    </Card>
                  </Col>
                ))}
              </Row>
              </div>
            )}

          </Container>
        </main>
      </div>

      {/* ====== FOOTER ====== */}
      <Footer />
    </>
  );
};

// Exportación por defecto del componente
export default Galeria;