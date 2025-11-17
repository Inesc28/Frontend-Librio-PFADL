import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLibros } from "../context/LibrosContext";
import "../assets/styles/Galeria.css";

const Galeria = () => {
  const navigate = useNavigate();
  const { libros, isLoading, error } = useLibros();

  const [currentPage, setCurrentPage] = useState(1);
  const [librosPorPagina] = useState(6);

  const indexOfLastLibro = currentPage * librosPorPagina;
  const indexOfFirstLibro = indexOfLastLibro - librosPorPagina;
  const librosActuales = libros.slice(indexOfFirstLibro, indexOfLastLibro);
  const totalPaginas = Math.ceil(libros.length / librosPorPagina);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleVerDetalles = (id) => {
    navigate(`/detalles/${id}`);
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  if (isLoading) {
    return (
      <Container className="text-center p-5">
        <h2 className="galeria-titulo-pagina">Cargando libros...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center p-5">
        <h1 className="galeria-titulo-pagina text-danger">Error</h1>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="galeria-pagina-container">
      <section className="galeria-hero-section">
        <Container>
          <Row className="mb-4">
            <Col>
              <h1 className="galeria-titulo-pagina text-center">
                Galería de Libros
              </h1>
              <p className="galeria-subtitulo-pagina text-center">
                Descubre los libros disponibles en nuestra comunidad
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="galeria-cards-area">
        <Row className="justify-content-center g-4">
          {librosActuales.map((libro, index) => (
            <Col key={libro.id_libros || index} xs={12} sm={6} md={4}>
              <Card className="galeria-card">
                <Card.Img
                  src={libro.url_img}
                  alt={`Portada de ${libro.titulo}`}
                  className="galeria-card-img"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/400x500/8b5a8c/ffffff?text=Sin+Imagen";
                  }}
                />

                <div className="galeria-card-overlay">
                  <div className="galeria-card-info">
                    <span className="galeria-card-titulo">{libro.titulo}</span>
                    <span className="galeria-card-precio">
                      {formatearPrecio(libro.precio)}
                    </span>
                  </div>

                  <Button
                    className="galeria-btn-ver-mas"
                    onClick={() => handleVerDetalles(libro.id_libros)}
                  >
                    Ver mas
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {totalPaginas > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPaginas).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPaginas}
              />
            </Pagination>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Galeria;
