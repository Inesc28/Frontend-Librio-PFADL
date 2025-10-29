/**
 * Componente Publicar - Página para vender un libro
 * 
 * Este componente renderiza la página donde los usuarios pueden publicar
 * libros para vender en la plataforma Librio.
 * Incluye formulario completo con todos los campos necesarios.
 * Utiliza componentes modulares (Navbar y Footer) y React Bootstrap.
 * Integrado con React Context para gestión global del estado y simulación de API.
 */

import React, { useState } from 'react';
import {
  Container,    // Contenedor responsivo de Bootstrap
  Row,         // Fila del grid system
  Col,         // Columna del grid system
  Form,        // Formulario de Bootstrap
  Button,      // Botón estilizado
  Card,        // Tarjeta contenedora
  Alert,       // Alertas de Bootstrap
  Spinner      // Spinner de carga
} from 'react-bootstrap';
import { Navbar, Footer } from '../../../components';  // Componentes modulares
import { useLibros } from '../../../context/LibrosContext';  // Hook del contexto
import './Publicar.css';

/**
 * Componente funcional Publicar
 * @returns {JSX.Element} Página para publicar libros en Librio
 */
const Publicar = () => {

  // ====== CONTEXTO DE LIBROS ======
  const { agregarLibro, isLoading, error, limpiarError } = useLibros();

  // ====== ESTADO DEL FORMULARIO ======
  // 🚀 MEJORA DISPONIBLE: Usar custom hook useForm
  // 💡 EJEMPLO DE IMPLEMENTACIÓN:
  /*
  import { useForm } from '../../../hooks';
  
  const validationRules = {
    titulo: { required: 'El título es obligatorio' },
    autor: { required: 'El autor es obligatorio' },
    precio: { 
      required: 'El precio es obligatorio', 
      positive: true, 
      positiveMessage: 'El precio debe ser mayor a 0' 
    }
  };

  const {
    values: libroData,
    errors,
    handleChange: handleInputChange,
    handleSubmit,
    isSubmitting,
    resetForm
  } = useForm({
    titulo: '', autor: '', editorial: '', año: '', 
    genero: '', descripcion: '', precio: '', urlImagen: ''
  }, validationRules, async (values) => {
    await agregarLibro(values);
    // Lógica de éxito
  });
  */
  
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

  // ====== ESTADO DE MENSAJES ======
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState('success'); // success, warning, danger

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
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenir comportamiento por defecto

    // Limpiar mensajes y errores anteriores
    setMensaje(null);
    limpiarError();

    // ====== VALIDACIÓN COMPLETA ======
    const errores = [];

    if (!libroData.titulo.trim()) errores.push('El título es obligatorio');
    if (!libroData.autor.trim()) errores.push('El autor es obligatorio');
    if (!libroData.precio || parseFloat(libroData.precio) <= 0) {
      errores.push('El precio debe ser mayor a 0');
    }

    if (errores.length > 0) {
      setMensaje(`Errores de validación: ${errores.join(', ')}`);
      setTipoMensaje('danger');
      return;
    }

    try {
      // ====== PREPARAR DATOS PARA LA API ======
      const datosLibro = {
        titulo: libroData.titulo.trim(),
        autor: libroData.autor.trim(),
        editorial: libroData.editorial.trim() || 'Editorial no especificada',
        año: parseInt(libroData.año) || new Date().getFullYear(),
        genero: libroData.genero.trim() || 'Sin género',
        precio: parseFloat(libroData.precio),
        descripcion: libroData.descripcion.trim() || 'Sin descripción disponible',
        urlImagen: libroData.urlImagen.trim() || 'https://via.placeholder.com/300x400/8b5a8c/ffffff?text=Sin+Imagen'
      };

      // ====== LLAMADA AL CONTEXT ======
      const resultado = await agregarLibro(datosLibro);

      if (resultado.success) {
        // ====== ÉXITO - MOSTRAR MENSAJE Y LIMPIAR FORMULARIO ======
        setMensaje(`¡Libro publicado exitosamente! Ya está disponible en la galería.`);
        setTipoMensaje('success');

        // Limpiar formulario
        setLibroData({
          titulo: '',
          autor: '',
          editorial: '',
          año: '',
          genero: '',
          descripcion: '',
          precio: '',
          urlImagen: ''
        });

        // Auto-ocultar el mensaje después de 5 segundos
        setTimeout(() => setMensaje(null), 5000);

      } else {
        // ====== ERROR ======
        setMensaje(`Error: ${resultado.error}`);
        setTipoMensaje('danger');
      }

    } catch (error) {
      // ====== ERROR INESPERADO ======
      setMensaje('Error al publicar el libro. Inténtalo nuevamente.');
      setTipoMensaje('danger');
    }
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

                    {/* ====== ALERTAS Y MENSAJES DE ESTADO ====== */}
                    {mensaje && (
                      <Alert variant={tipoMensaje} className="mb-4" dismissible onClose={() => setMensaje(null)}>
                        {mensaje}
                      </Alert>
                    )}

                    {error && (
                      <Alert variant="danger" className="mb-4" dismissible onClose={limpiarError}>
                        <strong>Error de conexión:</strong> {error}
                      </Alert>
                    )}

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

                      {/* ====== BOTÓN DE PUBLICAR CON ESTADOS ====== */}
                      <div className="text-center">
                        <Button
                          type="submit"
                          className="publicar-button"
                          size="lg"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Publicando...
                            </>
                          ) : (
                            'Publicar'
                          )}
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