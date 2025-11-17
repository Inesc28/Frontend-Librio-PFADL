import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../assets/styles/Detalles.css";

const API_URL = import.meta.env.VITE_API_URL;

const Detalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalleLibro = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No estás autenticado.");
        }

        const response = await axios.get(`${API_URL}/libros/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLibro(response.data);
      } catch (err) {
        console.error("Error al cargar el libro:", err);
        if (err.response && err.response.status === 404) {
          setError("El libro que buscas no existe.");
        } else {
          setError("Hubo un problema al cargar el libro. Intenta nuevamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetalleLibro();
    }
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (libro) {
      addToCart(libro);
      navigate("/carrito");
    }
  };

  if (loading) {
    return (
      <div className="detalles-loading-container">
        <Spinner animation="border" variant="light" />
        <p className="mt-3">Cargando detalles del libro...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <h4>Error</h4>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate("/galeria")}>
            Volver a la galería
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!libro) return null;

  const formatNumber = (num) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="detalles-pagina-container">
      <Container>
        <Button
          variant="outline-light"
          onClick={() => navigate("/galeria")}
          className="mb-4"
        >
          ← Volver a la Galería
        </Button>

        <Row className="detalles-content-wrapper">
          <Col md={5} lg={4} className="detalles-img-col">
            <Image
              src={libro.urlImagen}
              alt={`Portada de ${libro.titulo}`}
              className="detalles-img"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/400x600/8b5a8c/ffffff?text=Sin+Imagen";
              }}
            />
          </Col>

          <Col md={7} lg={8} className="detalles-info-col">
            <h1 className="detalles-titulo">{libro.titulo}</h1>
            <h2 className="detalles-autor">por {libro.autor}</h2>

            <p className="detalles-descripcion">
              {libro.descripcion || "No hay descripción disponible."}
            </p>

            <div className="detalles-metadata">
              <span>
                <strong>Año:</strong> {libro.año}
              </span>
              <span>
                <strong>Editorial:</strong> {libro.editorial || "N/A"}
              </span>
              <span>
                <strong>Género:</strong> {libro.genero || "N/A"}
              </span>
            </div>

            <div className="detalles-precio-y-accion">
              <span className="detalles-precio">
                {formatNumber(libro.precio)}
              </span>
              <Button
                className="detalles-btn-agregar"
                size="lg"
                onClick={handleAgregarAlCarrito}
              >
                Agregar al carrito
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detalles;
