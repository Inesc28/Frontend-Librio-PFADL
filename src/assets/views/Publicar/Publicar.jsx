/**
 * Componente Publicar - Página para vender un libro
 * 
 * Este componente renderiza la página donde los usuarios pueden publicar
 * libros para vender en la plataforma Librio.
 * Incluye formulario completo con todos los campos necesarios.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
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
import { Navbar, Footer } from '../../../components';  // Componentes modulares
import './Publicar.css';

/**
 * Componente funcional Publicar
 * @returns {JSX.Element} Página para publicar libros en Librio
 */
const Publicar = () => {

  // ====== ESTADO DEL FORMULARIO ======
  // Estados para manejar los valores de todos los campos
  const [libroData, setLibroData] = useState({
    titulo: '',          // Título del libro
    autor: '',           // Autor del libro
    editorial: '',       // Editorial
    año: '',             // Año de publicación
    genero: '',          // Género literario
    descripcion: '',     // Descripción del libro
    precio: '',          // Precio de venta
    urlImagen: ''        // URL de la imagen del libro
  });

  /**
   * Maneja los cambios en los campos del formulario
   * @param {Event} e - Evento del input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibroData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /**
   * Maneja el envío del formulario para publicar el libro
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevenir comportamiento por defecto

    // TODO: Validar todos los campos
    console.log('Datos del libro a publicar:', libroData);

    // TODO: Enviar datos al servidor
    // TODO: Mostrar mensaje de confirmación
    // TODO: Limpiar formulario o redirigir
  };

  return (
    <>
      {/* ====== NAVEGACIÓN ====== */}
      <Navbar />

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <div className="publicar-container">
        <main className="publicar-main">
          <Container>
            <Row className="justify-content-center">

              {/* Columna centrada con el formulario */}
              <Col xs={12} lg={10} xl={8}>

                {/* ====== TARJETA PRINCIPAL ====== */}
                <Card className="publicar-card">
                  <Card.Body className="p-4 p-md-5">

                    {/* Título de la página */}
                    <h2 className="publicar-title text-center mb-5">
                      Publicar un Libro
                    </h2>

                    {/* ====== FORMULARIO DE PUBLICACIÓN ====== */}
                    <Form onSubmit={handleSubmit}>

                      {/* ====== PRIMERA FILA - TÍTULO Y AUTOR ====== */}
                      <Row className="mb-3">
                        {/* Campo Título */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              Título
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="titulo"
                              value={libroData.titulo}
                              onChange={handleInputChange}
                              className="publicar-input"
                              required
                            />
                          </Form.Group>
                        </Col>

                        {/* Campo Autor */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              Autor
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="autor"
                              value={libroData.autor}
                              onChange={handleInputChange}
                              className="publicar-input"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* ====== SEGUNDA FILA - EDITORIAL Y AÑO ====== */}
                      <Row className="mb-3">
                        {/* Campo Editorial */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              Editorial
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="editorial"
                              value={libroData.editorial}
                              onChange={handleInputChange}
                              className="publicar-input"
                              required
                            />
                          </Form.Group>
                        </Col>

                        {/* Campo Año */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              Año
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="año"
                              value={libroData.año}
                              onChange={handleInputChange}
                              className="publicar-input"
                              min="1000"
                              max="2025"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* ====== TERCERA FILA - GÉNERO Y PRECIO ====== */}
                      <Row className="mb-3">
                        {/* Campo Género */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              Género
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="genero"
                              value={libroData.genero}
                              onChange={handleInputChange}
                              className="publicar-input"
                              required
                            />
                          </Form.Group>
                        </Col>

                        {/* Campo Precio */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              Precio
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="precio"
                              value={libroData.precio}
                              onChange={handleInputChange}
                              className="publicar-input"
                              min="0"
                              step="0.01"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* ====== CUARTA FILA - DESCRIPCIÓN Y URL IMAGEN ====== */}
                      <Row className="mb-4">
                        {/* Campo Descripción */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              Descripción
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="descripcion"
                              value={libroData.descripcion}
                              onChange={handleInputChange}
                              className="publicar-input"
                              required
                            />
                          </Form.Group>
                        </Col>

                        {/* Campo URL Imagen */}
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="publicar-label">
                              URL Imagen
                            </Form.Label>
                            <Form.Control
                              type="url"
                              name="urlImagen"
                              value={libroData.urlImagen}
                              onChange={handleInputChange}
                              className="publicar-input"
                              placeholder="https://ejemplo.com/imagen.jpg"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* ====== BOTÓN DE PUBLICAR ====== */}
                      <div className="text-center">
                        <Button
                          type="submit"
                          className="publicar-button"
                          size="lg"
                        >
                          Publicar
                        </Button>
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
      <Footer />
    </>
  );
};

// Exportación por defecto del componente
export default Publicar;