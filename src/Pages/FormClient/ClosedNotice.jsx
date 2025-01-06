import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import CountdownTimer from './CountdownTimer';

const ClosedNotice = ({ proximaApertura }) => {
  return (
    <Container className="mt-3 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center shadow-lg border-0" style={{ overflow: 'hidden' }}>
            <Card.Header
              as="h2"
              className=" fw-bold"
            >
              ¡Es muy temprano para abrir!
            </Card.Header>
            <Card.Body>
              <Alert variant="warning" className="rounded-pill shadow-sm">
                <h4 className="fw-bold">⚠️ En estos momentos estamos fuera de servicio ⚠️</h4>
              </Alert>
              <Card.Text className="mb-4">
                Estamos trabajando duro para abrir y entregar tu pedido lo más pronto posible. 🚀
              </Card.Text>
              <Card.Text className="font-weight-bold">
                Nuestro horario de atención es de{' '}
                <Badge
                  bg="info"
                  className="me-1 p-2 fs-6 shadow"
                  style={{ fontWeight: '700', borderRadius: '12px' }}
                >
                  4:30 PM
                </Badge>{' '}
                a{' '}
                <Badge
                  bg="info"
                  className="me-1 p-2 fs-6 shadow"
                  style={{ fontWeight: '700', borderRadius: '12px' }}
                >
                  10:00 PM
                </Badge>{' '}
              </Card.Text>
              {proximaApertura && (
                <div className="mt-4">
                  <h4 style={{ fontWeight: 'bold' }}>
                    ⏳ ¡Próxima apertura en! ⏳
                  </h4>
                  <Badge
                    bg="success"
                    className="p-4 fs-2 mt-4 mb-2 shadow rounded-pill"
                    style={{
                      fontWeight: '700',
                      color: '#fff',
                      borderRadius: '16px',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
                      display: 'block',
                      marginTop: '1rem',
                      width: 'fit-content',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <CountdownTimer targetTime={proximaApertura} />
                  </Badge>
                </div>
              )}
            </Card.Body>
            <Card.Footer
              className="text-muted fw-bold"

            >
              🧡 Gracias por su comprensión, ¡ya casi estamos listos para atenderlo! 🎉
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container >
  );
};

export default ClosedNotice;
