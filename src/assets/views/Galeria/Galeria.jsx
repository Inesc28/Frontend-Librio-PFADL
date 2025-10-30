/**
 * Componente Galeria - Vista de productos para usuarios autenticados
 * 
 * Este componente renderiza la galería de libros publicados por los usuarios
 * en la plataforma Librio. Solo accesible para usuarios autenticados.
 * Muestra los productos en formato de grid responsivo con información básica.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 * Integrado con React Context para recibir datos dinámicos desde la API.
 */

import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
 */
const Galeria = () => {

  // ====== CONTEXTO Y NAVEGACIÓN ======
  const { 
    libros, 
    isLoading, 
    error, 
    obtenerLibros
  } = useLibros();
  const navigate = useNavigate();

  // ====== CARGAR DATOS AL MONTAR EL COMPONENTE ======
  /**
   * Efecto para obtener los libros al cargar la galería
   */
  useEffect(() => {
    obtenerLibros();
  }, [obtenerLibros]);

  // ====== 🚀 OPTIMIZACIÓN CON useMemo ======
  // 📍 UBICACIÓN: Galería - Formateo de precios optimizado
  // 💡 BENEFICIO: Evita recrear el formateador en cada render
  const formatearPrecio = useMemo(() => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
  }, []);

  // ====== 🚀 OPTIMIZACIÓN CON useMemo ======
  // 📍 UBICACIÓN: Galería - Estadísticas de libros
  // 💡 BENEFICIO: Solo recalcula cuando cambia la lista de libros
  // 🎯 USO: Evita cálculos costosos en cada render
  const estadisticasLibros = useMemo(() => {
    if (!libros || libros.length === 0) {
      return {
        total: 0,
        precioPromedio: 0,
        generoMasPopular: 'N/A',
        libroMasCaro: null,
        libroMasBarato: null
      };
    }

    const total = libros.length;
    const precioPromedio = libros.reduce((sum, libro) => sum + (libro.precio || 0), 0) / total;
    
    // Calcular género más popular
    const generos = libros.reduce((acc, libro) => {
      const genero = libro.genero || 'Sin género';
      acc[genero] = (acc[genero] || 0) + 1;
      return acc;
    }, {});
    
    const generoMasPopular = Object.entries(generos)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    const libroMasCaro = libros.reduce((max, libro) => 
      (libro.precio || 0) > (max?.precio || 0) ? libro : max, null);
    
    const libroMasBarato = libros.reduce((min, libro) => 
      (libro.precio || Infinity) < (min?.precio || Infinity) ? libro : min, null);

    return {
      total,
      precioPromedio: Math.round(precioPromedio),
      generoMasPopular,
      libroMasCaro,
      libroMasBarato
    };
  }, [libros]);

  // ====== 🚀 OPTIMIZACIÓN CON useMemo ======
  // 📍 UBICACIÓN: Galería - Libros procesados con datos adicionales
  // 💡 BENEFICIO: Solo reprocesa cuando cambian los libros
  // 🎯 USO: Agrega información calculada a cada libro sin afectar performance
  const librosConDatosAdicionales = useMemo(() => {
    return libros.map(libro => ({
      ...libro,
      // Información adicional calculada
      precioFormateado: formatearPrecio.format(libro.precio || 0),
      esNuevo: (() => {
        const fechaPublicacion = new Date(libro.fechaPublicacion);
        const ahora = new Date();
        const diferenciaDias = (ahora - fechaPublicacion) / (1000 * 60 * 60 * 24);
        return diferenciaDias <= 7; // Nuevo si fue publicado en los últimos 7 días
      })(),
      esCaro: (libro.precio || 0) > estadisticasLibros.precioPromedio,
      slugTitulo: libro.titulo?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'libro'
    }));
  }, [libros, formatearPrecio, estadisticasLibros.precioPromedio]);

  /**
   * Maneja el clic en el botón "Ver Detalles"
   * Navega a la página de detalles del libro seleccionado
   * @param {string} libroId - ID del libro seleccionado
   */
  const handleVerDetalles = (libroId) => {
    navigate(`/detalles/${libroId}`);
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

            {/* ====== 📊 ESTADÍSTICAS OPTIMIZADAS ====== */}
            {!isLoading && !error && librosConDatosAdicionales.length > 0 && (
              <Row className="mb-4">
                <Col>
                  <div className="galeria-stats text-center text-light">
                    <p>
                      📚 <strong>{estadisticasLibros.total}</strong> libros disponibles | 
                      💰 Precio promedio: <strong>${estadisticasLibros.precioPromedio.toLocaleString()}</strong> | 
                      🏆 Género popular: <strong>{estadisticasLibros.generoMasPopular}</strong>
                    </p>
                  </div>
                </Col>
              </Row>
            )}

            {/* ====== CONTENEDOR CON FONDO PARA LAS CARDS ====== */}
            {!isLoading && !error && (
              <div className="galeria-cards-container">
                <Row className="justify-content-center g-3">
                  {/* 🚀 USANDO DATOS OPTIMIZADOS CON useMemo */}
                  {librosConDatosAdicionales.map((libro) => (
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
                          
                          {/* 🚀 PRECIO OPTIMIZADO - Ya formateado con useMemo */}
                          <div className="galeria-precio-nuevo">
                            {libro.precioFormateado}
                            {/* 🎯 BADGE: Mostrar si es caro o nuevo */}
                            {libro.esNuevo && <span className="badge bg-success ms-2">¡Nuevo!</span>}
                            {libro.esCaro && <span className="badge bg-warning ms-2">Premium</span>}
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