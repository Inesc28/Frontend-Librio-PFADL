import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/IniciarSesion.css";

const API_URL = import.meta.env.VITE_API_URL;

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${API_URL}/login`, formData);

      let token = null;

      if (
        response.data &&
        typeof response.data.token === "object" &&
        response.data.token !== null &&
        typeof response.data.token.token === "string" &&
        response.data.token.token.length > 0
      ) {
        token = response.data.token.token;
      } else if (
        response.data &&
        typeof response.data.token === "string" &&
        response.data.token.length > 0
      ) {
        token = response.data.token;
      }

      if (token) {
        login(token);
      } else {
        setMensajeError(
          "Respuesta inesperada del servidor (token malformado)."
        );
      }
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      setMensajeError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Email o contraseña incorrectos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <Container>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card className="login-card">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <div className="login-logo">
                      <img
                        src="/images/logo.PNG"
                        alt="Librio Logo"
                        className="logo-image-large"
                      />
                    </div>
                  </div>

                  <h2 className="login-title text-center mb-4">
                    Iniciar Sesión
                  </h2>

                  {mensajeError && (
                    <Alert variant="danger">{mensajeError}</Alert>
                  )}

                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="login-label">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        className="login-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="login-label">
                        Contraseña
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        className="login-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid mb-4">
                      <Button
                        type="submit"
                        className="login-button"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? "Iniciando..." : "Iniciar Sesión"}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="register-text">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/registro" className="register-link">
                          Regístrate
                        </Link>
                      </p>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default IniciarSesion;
