/**
 * Componente LibrosDashboard - Panel de estadísticas de libros
 * 
 * Este componente demuestra el poder del React Context al mostrar
 * estadísticas en tiempo real que se actualizan automáticamente
 * cuando se agregan nuevos libros desde cualquier parte de la aplicación.
 */

import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useLibros } from '../../context/LibrosContext';

/**
 * Componente de dashboard que muestra estadísticas de libros en tiempo real
 * @returns {JSX.Element} Panel de estadísticas
 */
const LibrosDashboard = () => {
  const { 
    libros, 
    totalLibros, 
    librosDisponibles, 
    isLoading 
  } = useLibros();

  // Calcular estadísticas adicionales
  const generos = libros.reduce((acc, libro) => {
    const genero = libro.genero || 'Sin género';
    acc[genero] = (acc[genero] || 0) + 1;
    return acc;
  }, {});

  const precioPromedio = libros.length > 0 
    ? libros.reduce((sum, libro) => sum + libro.precio, 0) / libros.length
    : 0;

  const librosRecientes = libros
    .filter(libro => {
      const fechaLibro = new Date(libro.fechaPublicacion);
      const ahora = new Date();
      const diffHoras = (ahora - fechaLibro) / (1000 * 60 * 60);
      return diffHoras <= 24; // Libros publicados en las últimas 24 horas
    }).length;

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">📊 Dashboard de Libros (React Context)</h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          
          {/* Estadísticas básicas */}
          <Col md={3}>
            <div className="text-center p-3 border rounded">
              <h4 className="text-primary">{totalLibros}</h4>
              <small className="text-muted">Total de Libros</small>
            </div>
          </Col>

          <Col md={3}>
            <div className="text-center p-3 border rounded">
              <h4 className="text-success">{librosDisponibles}</h4>
              <small className="text-muted">Disponibles</small>
            </div>
          </Col>

          <Col md={3}>
            <div className="text-center p-3 border rounded">
              <h4 className="text-info">{librosRecientes}</h4>
              <small className="text-muted">Recientes (24h)</small>
            </div>
          </Col>

          <Col md={3}>
            <div className="text-center p-3 border rounded">
              <h4 className="text-warning">
                ${precioPromedio.toFixed(0)}
              </h4>
              <small className="text-muted">Precio Promedio</small>
            </div>
          </Col>

        </Row>

        {/* Géneros más populares */}
        {Object.keys(generos).length > 0 && (
          <Row className="mt-4">
            <Col>
              <h6>Géneros más populares:</h6>
              <div>
                {Object.entries(generos)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([genero, cantidad]) => (
                    <Badge 
                      key={genero} 
                      bg="secondary" 
                      className="me-2 mb-2"
                    >
                      {genero}: {cantidad}
                    </Badge>
                  ))
                }
              </div>
            </Col>
          </Row>
        )}

        {/* Estado de carga */}
        {isLoading && (
          <div className="text-center mt-3">
            <small className="text-muted">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Actualizando datos...
            </small>
          </div>
        )}

        {/* Mensaje si no hay libros */}
        {totalLibros === 0 && !isLoading && (
          <div className="text-center mt-3 text-muted">
            <p>📚 ¡Publica el primer libro para ver las estadísticas!</p>
          </div>
        )}

      </Card.Body>
    </Card>
  );
};

export default LibrosDashboard;