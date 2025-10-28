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
    // ====== EJEMPLOS DE ESTRUCTURA DE DATOS ======
    // Estas dos cards sirven como ejemplo del diseño y estructura esperada
    {
      id: 1,
      titulo: "Rosas Rojas",
      autor: "Autor Ejemplo 1",
      editorial: "Editorial Romance",
      año: 2023,
      genero: "Romance",
      precio: 200,
      descripcion: "Una hermosa historia de amor que cautiva desde la primera página.",
      urlImagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      titulo: "Rosas Rojas",
      autor: "Autor Ejemplo 2", 
      editorial: "Editorial Clásicos",
      año: 2022,
      genero: "Romance",
      precio: 200,
      descripcion: "Continuación de la saga que enamoró a millones de lectores.",
      urlImagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      titulo: "Rosas Rojas",
      autor: "Autor Ejemplo 3",
      editorial: "Editorial Moderna",
      año: 2024,
      genero: "Romance",
      precio: 200,
      descripcion: "Nueva entrega de la serie más esperada del año.",
      urlImagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      titulo: "Rosas Rojas",
      autor: "Autor Ejemplo 4",
      editorial: "Editorial Premium",
      año: 2021,
      genero: "Romance",
      precio: 200,
      descripcion: "Edición especial con contenido exclusivo.",
      urlImagen: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      titulo: "Rosas Rojas",
      autor: "Autor Ejemplo 5",
      editorial: "Editorial Digital",
      año: 2023,
      genero: "Romance",
      precio: 200,
      descripcion: "Versión actualizada con nuevo prólogo del autor.",
      urlImagen: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      titulo: "Rosas Rojas",
      autor: "Autor Ejemplo 6",
      editorial: "Editorial Vintage",
      año: 2020,
      genero: "Romance",
      precio: 200,
      descripcion: "Colección completa en una sola edición de lujo.",
      urlImagen: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
    // ====== AQUÍ SE CARGARÁN LOS DATOS DE LA BASE DE DATOS ======
    // Los demás libros vendrán de la API/base de datos cuando se conecte el backend
    // Estructura esperada: { id, titulo, autor, editorial, año, genero, precio, descripcion, urlImagen }
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