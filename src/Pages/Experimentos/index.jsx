import { Carousel, Card } from 'react-bootstrap';

const CarouselComponent = () => {
  return (
    <Carousel className='sticky'>
      <Carousel.Item>
        <div className="d-flex justify-content-around">
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>Card 1</Card.Title>
              <Card.Text>
                Contenido de la Card 1.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>Card 2</Card.Title>
              <Card.Text>
                Contenido de la Card 2.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>Card 3</Card.Title>
              <Card.Text>
                Contenido de la Card 3.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="d-flex justify-content-around">
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>Card 4</Card.Title>
              <Card.Text>
                Contenido de la Card 4.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>Card 5</Card.Title>
              <Card.Text>
                Contenido de la Card 5.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>Card 6</Card.Title>
              <Card.Text>
                Contenido de la Card 6.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
