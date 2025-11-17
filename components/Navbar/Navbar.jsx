import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../src/context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import "./Navbar.css";

const CustomNavbar = () => {
  const { obtenerCantidadTotalCarrito } = useCart();
  const cantidadCarrito = obtenerCantidadTotalCarrito();

  const { isAuthenticated, logout, user } = useAuth();

  const isAdmin = user && user.admin === true;

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/images/logo.PNG"
            alt="Librio Logo"
            className="logo-image me-2"
          />
          <span className="logo-text">LIBRIO</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="custom-nav-link">
              Inicio
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/galeria" className="custom-nav-link">
                  Galería
                </Nav.Link>

                {isAdmin && (
                  <Nav.Link
                    as={Link}
                    to="/publicar"
                    className="custom-nav-link"
                  >
                    Publicar
                  </Nav.Link>
                )}

                <Nav.Link
                  as={Link}
                  to="/carrito"
                  className="custom-nav-link position-relative"
                >
                  Carrito
                  {cantidadCarrito > 0 && (
                    <Badge bg="danger" pill className="carrito-badge">
                      {cantidadCarrito > 99 ? "99+" : cantidadCarrito}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link
                  className="custom-nav-link"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  Cerrar Sesión
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/mi-perfil"
                  className="custom-nav-link profile-icon d-flex align-items-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    title="Mi Perfil"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>

                  {isAdmin && (
                    <span
                      className="ms-2 badge rounded-pill"
                      style={{
                        backgroundColor: "#4a1942",
                        color: "#d4a5d4",
                        fontWeight: 600,
                        paddingTop: "0.35em",
                        paddingBottom: "0.35em",
                      }}
                    >
                      Admin
                    </span>
                  )}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/registro" className="custom-nav-link">
                  Registrate
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/iniciar-sesion"
                  className="custom-nav-link"
                >
                  Iniciar Sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
