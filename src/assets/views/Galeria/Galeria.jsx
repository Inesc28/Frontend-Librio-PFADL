/**
 * Componente Galeria - Vista de productos para usuarios autenticados
 * 
 * Este componente renderiza la galería de libros publicados por los usuarios
 * en la plataforma Librio. Solo accesible para usuarios autenticados.
 * Muestra los productos en formato de grid responsivo con información básica.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 */

import React, { useState, useEffect } from 'react';
import {
  Container,    // Contenedor responsivo de Bootstrap
  Row,         // Fila del grid system
  Col,         // Columna del grid system
  Card,        // Tarjeta contenedora
  Button,      // Botón estilizado
  Badge        // Etiqueta para precio
} from 'react-bootstrap';
import { Navbar, Footer } from '../../../components';  // Componentes modulares
import './Galeria.css';

/**
 * Componente funcional Galeria
 * @returns {JSX.Element} Página de galería de libros para usuarios autenticados
 */
const Galeria = () => {

  // ====== ESTADO PARA LIBROS ======
  // Este estado almacenará los libros obtenidos de la base de datos
  const [libros, setLibros] = useState([
    // ====== EJEMPLO DE ESTRUCTURA DE DATOS ======
    // Esta primera card sirve como ejemplo de la estructura esperada
    {
      id: 1,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      editorial: "Editorial Sudamericana",
      año: 1967,
      genero: "Realismo mágico",
      precio: 25000,
      descripcion: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía.",
      urlImagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/61/8d/618dfe0c8967274cd9589a549adff52d.jpg"
    },
    {
      id: 1,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      editorial: "Editorial Sudamericana",
      año: 1967,
      genero: "Realismo mágico",
      precio: 25000,
      descripcion: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía.",
      urlImagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/61/8d/618dfe0c8967274cd9589a549adff52d.jpg"
    }
    // ====== AQUÍ SE CARGARÁN LOS DATOS DE LA BASE DE DATOS ======
    // Los demás libros vendrán de la API/base de datos
  ]);

  // ====== ESTADO DE CARGA ======
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ====== FUNCIÓN PARA CARGAR LIBROS DESDE LA BASE DE DATOS ======
  /**
   * Carga los libros desde la API/base de datos
   * TODO: Implementar llamada real a la API
   */
  const cargarLibros = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Reemplazar con la llamada real a tu API
      // const response = await fetch('/api/libros');
      // const librosFromDB = await response.json();

      // TODO: Actualizar el estado con los datos de la base de datos
      // setLibros([
      //     // Mantener el libro de ejemplo
      //     libros[0],
      //     // Agregar los libros de la base de datos
      //     ...librosFromDB
      // ]);

    } catch (err) {
      setError('Error al cargar los libros');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ====== EFECTO PARA CARGAR DATOS AL MONTAR EL COMPONENTE ======
  // TODO: Descomentar cuando tengas la API lista
  // useEffect(() => {
  //     cargarLibros();
  // }, []);

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
   * @param {number} libroId - ID del libro seleccionado
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
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
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
                      onClick={cargarLibros}
                    >
                      Reintentar
                    </Button>
                  </div>
                </Col>
              </Row>
            )}

            {/* ====== GRID DE LIBROS ====== */}
            {!isLoading && !error && (
              <Row className="g-4">
                {libros.map((libro) => (
                  <Col key={libro.id} xs={12} sm={6} md={4} lg={3}>

                    {/* ====== TARJETA DE LIBRO ====== */}
                    <Card className="galeria-card h-100">

                      {/* Imagen del libro */}
                      <div className="galeria-imagen-container">
                        <Card.Img
                          variant="top"
                          src={libro.urlImagen}
                          alt={`Portada de ${libro.titulo}`}
                          className="galeria-imagen"
                        // onError={(e) => {
                        //     // Imagen por defecto si falla la carga
                        //     e.target.src = 'https://via.placeholder.com/200x280/8b5a8c/ffffff?text=Sin+Imagen';
                        // }}
                        />
                      </div>

                      {/* Contenido de la tarjeta */}
                      <Card.Body className="d-flex flex-column">

                        {/* Título del libro */}
                        <Card.Title className="galeria-libro-titulo">
                          {libro.titulo}
                        </Card.Title>

                        {/* Información básica */}
                        <div className="galeria-info mb-3">
                          <p className="galeria-autor mb-1">
                            <strong>Autor:</strong> {libro.autor}
                          </p>
                          <p className="galeria-editorial mb-1">
                            <strong>Editorial:</strong> {libro.editorial}
                          </p>
                          <p className="galeria-año mb-1">
                            <strong>Año:</strong> {libro.año}
                          </p>
                          <Badge bg="secondary" className="galeria-genero">
                            {libro.genero}
                          </Badge>
                        </div>

                        {/* Descripción breve */}
                        <p className="galeria-descripcion">
                          {libro.descripcion.length > 80
                            ? `${libro.descripcion.substring(0, 80)}...`
                            : libro.descripcion
                          }
                        </p>

                        {/* Precio y botones */}
                        <div className="mt-auto">
                          <div className="galeria-precio mb-3">
                            <span className="precio-valor">
                              {formatearPrecio(libro.precio)}
                            </span>
                          </div>

                          {/* Botón de acción */}
                          <div className="galeria-botones">
                            <Button
                              variant="outline-light"
                              size="sm"
                              className="mb-2"
                              onClick={() => handleVerDetalles(libro.id)}
                            >
                              Ver Detalles
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}

                {/* ====== MENSAJE SI NO HAY LIBROS ====== */}
                {libros.length === 0 && (
                  <Col xs={12}>
                    <div className="galeria-vacio text-center">
                      <h3>No hay libros disponibles</h3>
                      <p>¡Sé el primero en publicar un libro en la galería!</p>
                    </div>
                  </Col>
                )}
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
export default Galeria;