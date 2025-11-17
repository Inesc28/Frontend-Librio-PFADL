import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Table,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../assets/styles/MiPerfil.css";

const API_URL = import.meta.env.VITE_API_URL;

const formatNumber = (num) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-ES");
};

const MiPerfil = () => {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = user && user.admin === true;

  useEffect(() => {
    const fetchPedidos = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("No estás autenticado.");
        setLoading(false);
        return;
      }

      let endpointUrl = "";
      if (isAdmin) {
        endpointUrl = `${API_URL}/pedidos`;
      } else {
        endpointUrl = `${API_URL}/pedidosUsuario/${userId}`;
      }

      try {
        const response = await axios.get(endpointUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPedidos(response.data || []);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);

        if (err.response && err.response.status === 404) {
          setPedidos([]);
        } else {
          setError(
            err.response?.data?.error || "No se pudieron cargar los pedidos."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPedidos();
    }
  }, [user, isAdmin]);

  const renderPedidosSection = () => {
    if (loading) {
      return (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="light" />
          <p className="text-white-50">Buscando historial de pedidos...</p>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      );
    }

    if (pedidos.length === 0) {
      return (
        <Alert variant="info" className="mt-4 text-center">
          Aún no has realizado ningún pedido.
        </Alert>
      );
    }

    return (
      <div className="pedidos-section mt-5">
        <h3 className="perfil-nombre text-center mb-4">
          {isAdmin ? "Historial General de Pedidos" : "Mis Pedidos"}
        </h3>
        <div className="pedidos-table-scroll-container">
        <Table responsive hover className="pedidos-table" variant="dark">
          <thead>
            <tr>
              <th>ID Pedido</th>
              {isAdmin && <th>ID Usuario</th>}
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id_pedido}>
                <td>#{pedido.id_pedido}</td>
                {isAdmin && <td>{pedido.usuario_id}</td>}
                <td>{formatDate(pedido.fecha_pedido)}</td>
                <td>{formatNumber(pedido.monto_total)}</td>
                <td>
                  <span
                    className={`badge ${
                      pedido.estado ? "bg-success" : "bg-warning text-dark"
                    }`}
                  >
                    {pedido.estado ? "Completado" : "Pendiente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="perfil-container">
        <main className="perfil-main">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} xl={6}>
                <Card className="perfil-card">
                  <Card.Body className="p-4 p-md-5">
                    <div className="text-center mb-4">
                      <h2 className="perfil-nombre">
                        ¡Bienvenido de nuevo, {user.nombre}!
                      </h2>
                      <p className="perfil-email">Tu correo es {user.email}.</p>

                      <p className="text-white-50 mt-4">
                        {isAdmin
                          ? "A continuación, puedes ver todos los pedidos de la plataforma:"
                          : "A continuación, puedes ver el historial de tus pedidos:"}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={10} xl={8}>
                {renderPedidosSection()}
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </>
  );
};

export default MiPerfil;
