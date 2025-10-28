/**
 * Componente Detalles - Vista detallada de un libro específico
 * 
 * Este componente renderiza la información completa de un libro seleccionado
 * desde la galería. Solo accesible para usuarios autenticados.
 * Muestra imagen, información completa, descripción y opción de agregar al carrito.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,    // Contenedor responsivo de Bootstrap
  Row,         // Fila del grid system
  Col,         // Columna del grid system
  Card,        // Tarjeta contenedora
  Button,      // Botón estilizado
  Badge        // Etiqueta para información
} from 'react-bootstrap';
import { Navbar, Footer } from '../../../components';  // Componentes modulares
import { useLibros } from '../../../context/LibrosContext';  // Hook del contexto
import './Detalles.css';

/**
 * Componente funcional Detalles
 * @returns {JSX.Element} Página de detalles del libro para usuarios autenticados
 */
const Detalles = () => {

  // ====== CONTEXTO Y NAVEGACIÓN ======
  const { obtenerLibroPorId } = useLibros();
  const { id } = useParams(); // Obtener ID del libro desde la URL
  const navigate = useNavigate();

  // ====== ESTADO DEL LIBRO ======
  const [libro, setLibro] = useState(null);

  // ====== CARGAR LIBRO AL MONTAR EL COMPONENTE ======
  useEffect(() => {
    if (id) {
      const libroEncontrado = obtenerLibroPorId(id);
      if (libroEncontrado) {
        setLibro(libroEncontrado);
      } else {
        // Si no se encuentra el libro, redirigir a galería
        navigate('/galeria');
      }
    }
  }, [id, obtenerLibroPorId, navigate]);

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
   * Maneja el clic en agregar al carrito
   */
  const handleAgregarAlCarrito = () => {
    // TODO: Implementar funcionalidad de carrito
    alert('Funcionalidad de carrito próximamente disponible');
  };

  /**
   * Maneja el clic en volver a la galería
   */
  const handleVolver = () => {
    navigate('/galeria');
  };

  // ====== RENDERIZADO CONDICIONAL ======
  if (!libro) {
    return (
      <>
        <Navbar />
        <div className="detalles-container">
          <Container>
            <div className="text-center mt-5 pt-5">
              <h3 className="text-light">Cargando libro...</h3>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* ====== NAVEGACIÓN ====== */}
      <Navbar />

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <div className="detalles-container">
        <main className="detalles-main">
          <Container>

            {/* ====== BOTÓN DE VOLVER ====== */}
            <Row className="mb-4">
              <Col>
                <Button
                  variant="outline-light"
                  onClick={handleVolver}
                  className="detalles-btn-volver"
                >
                  ← Volver a la Galería
                </Button>
              </Col>
            </Row>

            {/* ====== CONTENEDOR PRINCIPAL DE DETALLES ====== */}
            <div className="detalles-card-container">
              <Card className="detalles-card">
                <Row className="g-0">

                  {/* ====== COLUMNA DE IMAGEN ====== */}
                  <Col md={5}>
                    <div className="detalles-imagen-container">
                      <Card.Img
                        src={libro.urlImagen}
                        alt={`Portada de ${libro.titulo}`}
                        className="detalles-imagen"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x600/8b5a8c/ffffff?text=Sin+Imagen';
                        }}
                      />
                    </div>
                  </Col>

                  {/* ====== COLUMNA DE INFORMACIÓN ====== */}
                  <Col md={7}>
                    <Card.Body className="detalles-info">

                      {/* Título del libro */}
                      <h1 className="detalles-titulo">
                        {libro.titulo}
                      </h1>

                      {/* Autor */}
                      <h2 className="detalles-autor">
                        {libro.autor}
                      </h2>

                      {/* Género */}
                      <p className="detalles-genero">
                        Género: <strong>{libro.genero}</strong>
                      </p>

                      {/* Información adicional */}
                      <div className="detalles-metadata mb-4">
                        <Row>
                          <Col sm={6}>
                            <p className="detalles-info-item">
                              <strong>Año:</strong> {libro.año}
                            </p>
                          </Col>
                          <Col sm={6}>
                            <p className="detalles-info-item">
                              <strong>Editorial:</strong> {libro.editorial}
                            </p>
                          </Col>
                        </Row>
                      </div>

                      {/* Descripción */}
                      <div className="detalles-descripcion mb-4">
                        <p>{libro.descripcion}</p>
                      </div>

                      {/* Precio */}
                      <div className="detalles-precio mb-4">
                        <span className="detalles-precio-valor">
                          {formatearPrecio(libro.precio)}
                        </span>
                      </div>

                      {/* Botón agregar al carrito */}
                      <div className="detalles-acciones">
                        <Button
                          className="detalles-btn-carrito"
                          onClick={handleAgregarAlCarrito}
                          size="lg"
                        >
                          Agregar al carrito
                        </Button>
                      </div>

                    </Card.Body>
                  </Col>

                </Row>
              </Card>
            </div>

          </Container>
        </main>
      </div>

      {/* ====== FOOTER ====== */}
      <Footer />
    </>
  );
};

// Exportación por defecto del componente
export default Detalles;