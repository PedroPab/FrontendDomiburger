import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListCardPages = ({ pages }) => {
  // const pages = [
  //   { title: "Página Uno", description: "Esta es la descripción de la Página Uno.", path: "/pagina-uno" },
  //   { title: "Página Dos", description: "Esta es la descripción de la Página Dos.", path: "/pagina-dos" },
  //   // Agrega más páginas según sea necesario
  // ];

  return (
    <Container className="mt-5">
      <Row className="g-4">
        {pages.map((page, index) => (
          <Col md={4} key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{page.title}</Card.Title>
                <Card.Text>{page.description}</Card.Text>
                <Link to={page.path}>
                  <Button variant="primary" >Ir a {page.title}</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListCardPages;
