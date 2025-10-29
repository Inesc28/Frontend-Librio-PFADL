/**
 * Componente Carrito - Vista del carrito de compras
 * 
 * Este componente renderiza el carrito de compras del usuario autenticado.
 * Solo accesible para usuarios que hayan iniciado sesión.
 * Permite gestionar los libros agregados: ver detalles, cambiar cantidades y eliminar items.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,    // Contenedor responsivo de Bootstrap
  Row,         // Fila del grid system
  Col,         // Columna del grid system
  Card,        // Tarjeta contenedora
  Button,      // Botón estilizado
  Image        // Imagen responsiva
} from 'react-bootstrap';
import { Navbar, Footer } from '../../../components';  // Componentes modulares
import { useLibros } from '../../../context/LibrosContext';  // Hook del contexto
import './Carrito.css';

/**
 * Componente funcional Carrito
 * @returns {JSX.Element} Página del carrito de compras para usuarios autenticados
 */
const Carrito = () => {

  // ====== CONTEXTO Y NAVEGACIÓN ======
  const { 
    carrito, 
    actualizarCantidadCarrito, 
    eliminarDelCarrito, 
    obtenerTotalCarrito,
    limpiarCarrito 
  } = useLibros();
  const navigate = useNavigate();

  // ====== ESTADO LOCAL ======
  const [total, setTotal] = useState(0);

  // ====== CALCULAR TOTAL AL CAMBIAR EL CARRITO ======
  useEffect(() => {
    setTotal(obtenerTotalCarrito());
  }, [carrito, obtenerTotalCarrito]);

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
   * Maneja el incremento de cantidad de un libro
   * @param {string} libroId - ID del libro
   * @param {number} cantidadActual - Cantidad actual del libro
   */
  const handleIncrementarCantidad = (libroId, cantidadActual) => {
    actualizarCantidadCarrito(libroId, cantidadActual + 1);
  };

  /**
   * Maneja el decremento de cantidad de un libro
   * @param {string} libroId - ID del libro
   * @param {number} cantidadActual - Cantidad actual del libro
   */
  const handleDecrementarCantidad = (libroId, cantidadActual) => {
    if (cantidadActual > 1) {
      actualizarCantidadCarrito(libroId, cantidadActual - 1);
    }
  };

  /**
   * Maneja la eliminación de un libro del carrito
   * @param {string} libroId - ID del libro a eliminar
   */
  const handleEliminarDelCarrito = (libroId) => {
    eliminarDelCarrito(libroId);
  };

  /**
   * Maneja el proceso de checkout (próximamente)
   */
  const handleCheckout = () => {
    // TODO: Implementar proceso de checkout
    alert('Proceso de checkout próximamente disponible');
  };

  /**
   * Maneja la navegación de vuelta a la galería
   */
  const handleVolverAGaleria = () => {
    navigate('/galeria');
  };

  return (
    <>
      {/* ====== NAVEGACIÓN ====== */}
      <Navbar />

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <div className="carrito-container">
        <main className="carrito-main">
          <Container>

            {/* ====== TÍTULO ====== */}
            <Row className="mb-4">
              <Col>
                <h1 className="carrito-titulo text-center">
                  Carrito de Compras
                </h1>
              </Col>
            </Row>

            {/* ====== CONTENIDO DEL CARRITO ====== */}
            {carrito && carrito.length > 0 ? (
              <>
                {/* ====== LISTA DE LIBROS EN EL CARRITO ====== */}
                <div className="carrito-lista">
                  {carrito.map((item) => (
                    <div key={item.libro.id} className="carrito-item">
                      <Card className="mb-3">
                        <Row className="g-0 align-items-center">

                          {/* ====== IMAGEN DEL LIBRO ====== */}
                          <Col md={2}>
                            <div className="carrito-imagen-container">
                              <Image
                                src={item.libro.urlImagen}
                                alt={`Portada de ${item.libro.titulo}`}
                                className="carrito-imagen"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/120x180/8b5a8c/ffffff?text=Sin+Imagen';
                                }}
                              />
                            </div>
                          </Col>

                          {/* ====== INFORMACIÓN DEL LIBRO ====== */}
                          <Col md={4}>
                            <Card.Body className="py-3">
                              <h5 className="carrito-libro-titulo mb-1">
                                {item.libro.titulo}
                              </h5>
                              <p className="carrito-libro-autor text-muted mb-0">
                                {item.libro.autor}
                              </p>
                            </Card.Body>
                          </Col>

                          {/* ====== PRECIO UNITARIO ====== */}
                          <Col md={2}>
                            <div className="text-center">
                              <span className="carrito-precio">
                                {formatearPrecio(item.libro.precio)}
                              </span>
                            </div>
                          </Col>

                          {/* ====== CANTIDAD ====== */}
                          <Col md={2}>
                            <div className="carrito-cantidad-container">
                              <div className="carrito-cantidad-controls">
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="carrito-btn-cantidad"
                                  onClick={() => handleDecrementarCantidad(item.libro.id, item.cantidad)}
                                  disabled={item.cantidad <= 1}
                                >
                                  -
                                </Button>
                                <span className="carrito-cantidad-valor">
                                  {item.cantidad}
                                </span>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="carrito-btn-cantidad"
                                  onClick={() => handleIncrementarCantidad(item.libro.id, item.cantidad)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </Col>

                          {/* ====== BOTÓN ELIMINAR ====== */}
                          <Col md={2}>
                            <div className="text-center">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="carrito-btn-eliminar"
                                onClick={() => handleEliminarDelCarrito(item.libro.id)}
                              >
                                -
                              </Button>
                            </div>
                          </Col>

                        </Row>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* ====== RESUMEN Y TOTAL ====== */}
                <Row className="mt-4">
                  <Col md={8}>
                    <Button 
                      variant="outline-light" 
                      onClick={handleVolverAGaleria}
                      className="carrito-btn-volver"
                    >
                      ← Continuar Comprando
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Card className="carrito-resumen">
                      <Card.Body>
                        <h5 className="text-center mb-3">Resumen del Pedido</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal:</span>
                          <span>{formatearPrecio(total)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Envío:</span>
                          <span>Gratis</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-3">
                          <strong>Total:</strong>
                          <strong className="carrito-total">
                            {formatearPrecio(total)}
                          </strong>
                        </div>
                        <Button 
                          className="carrito-btn-checkout w-100"
                          size="lg"
                          onClick={handleCheckout}
                        >
                          Proceder al Pago
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            ) : (
              // ====== CARRITO VACÍO ======
              <Row>
                <Col>
                  <div className="carrito-vacio text-center">
                    <Card className="py-5">
                      <Card.Body>
                        <h3 className="text-light mb-3">Tu carrito está vacío</h3>
                        <p className="text-muted mb-4">
                          Explora nuestra galería y encuentra libros increíbles
                        </p>
                        <Button 
                          className="carrito-btn-galeria"
                          size="lg"
                          onClick={handleVolverAGaleria}
                        >
                          Ir a la Galería
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              </Row>
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
export default Carrito;