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
import "../assets/styles/RegistroUsuario.css";

const API_URL = import.meta.env.VITE_API_URL;

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    if (!formData.apellido.trim()) {
      newErrors.nombre = "El apellido es obligatorio.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El formato del email no es válido.";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError(null);
    setSuccess(false);
    setErrors({});

    try {
      const response = await axios.post(`${API_URL}/usuarios`, formData);

      setSuccess(true);
      setFormData({ nombre: "", apellido: "", email: "", password: "" });
    } catch (err) {
      console.error("Error en el registro:", err);
      setApiError(
        err.response?.data?.message ||
          err.message ||
          "Ocurrió un error al registrar. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <main className="registro-main">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card className="registro-card">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <div className="registro-logo">
                      <img
                        src="/images/logo.PNG"
                        alt="Librio Logo"
                        className="logo-image-large"
                      />
                    </div>
                  </div>

                  <h2 className="registro-title text-center mb-4">
                    Regístrate
                  </h2>
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="registro-label">Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        isInvalid={!!errors.nombre}
                        className="registro-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="registro-label">
                        Apellido
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        isInvalid={!!errors.apellido}
                        className="registro-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.apellido}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="registro-label">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        className="registro-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="registro-label">
                        Contraseña
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        className="registro-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {apiError && (
                      <Alert variant="danger" className="mt-3">
                        {apiError}
                      </Alert>
                    )}

                    {success && (
                      <Alert variant="success" className="mt-3">
                        ¡Registro exitoso! Ya puedes iniciar sesión.
                      </Alert>
                    )}

                    <div className="d-grid mb-4">
                      <Button
                        type="submit"
                        className="registro-button"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? "Registrando..." : "Registrarse"}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="login-text">
                        ¿Tienes una cuenta?{" "}
                        <Link to="/iniciar-sesion" className="login-link">
                          Inicia Sesión
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

export default RegistroUsuario;
