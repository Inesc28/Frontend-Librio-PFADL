import { Container, Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/Home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page-wrapper">
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10} xl={8}>
              <h1 className="hero-title">
                "Encuentra tu próxima gran lectura. Donde cada libro tiene una
                nueva historia que contar."
              </h1>
              <Button
                size="lg"
                className="cta-button"
                as={Link}
                to={isAuthenticated ? "/galeria" : "/iniciar-sesion"}
              >
                Empezar
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="books-gallery py-5">
        <Container>
          <Row className="g-3">
            <Col md={6} lg={8} xs={12}>
              <Image
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Estantería de libros"
                className="gallery-image"
                fluid
              />
            </Col>
            <Col md={6} lg={4} xs={12}>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Estantería de libros"
                className="gallery-image"
                fluid
              />
            </Col>

            <Col md={4} xs={12}>
              <Image
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Pila de libros"
                className="gallery-image"
                fluid
              />
            </Col>
            <Col md={4} xs={12}>
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Libro abierto"
                className="gallery-image center-book-special"
                fluid
              />
            </Col>
            <Col md={4} xs={12}>
              <Image
                src="https://tse4.mm.bing.net/th/id/OIP.cG6srzyNV4rjuY-CbkVPiAHaHa?w=980&h=980&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Pila de libros"
                className="gallery-image"
                fluid
              />
            </Col>

            <Col md={6} lg={8} xs={12}>
              <Image
                src="https://th.bing.com/th/id/R.5745955b7e1462240661d77c75aecdc9?rik=p6Kk6SVzB6gf5w&pid=ImgRaw&r=0"
                alt="Estantería de libros"
                className="gallery-image"
                fluid
              />
            </Col>
            <Col md={6} lg={4} xs={12}>
              <Image
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Estantería de libros"
                className="gallery-image"
                fluid
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
