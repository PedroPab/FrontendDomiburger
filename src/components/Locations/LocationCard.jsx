import React from "react";
import { Card, Badge, ListGroup, Container, Row, Col } from "react-bootstrap";
import { HouseFill, BuildingFill, BriefcaseFill, GeoAltFill, CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

const propertyIcons = {
  house: <HouseFill className="me-2 text-primary" />,
  building: <BuildingFill className="me-2 text-secondary" />,
  urbanization: <GeoAltFill className="me-2 text-success" />,
  office: <BriefcaseFill className="me-2 text-info" />,
};

const statusIcons = {
  active: <CheckCircleFill className="text-success" />,
  inactive: <XCircleFill className="text-danger" />,
};

const LocationCard = ({ location }) => {
  return (
    <Card className="mb-3 shadow-lg border-0 rounded-3" style={{ width: "24rem" }}>
      <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
        <div className="d-flex align-items-center">
          {propertyIcons[location.propertyType] || <HouseFill className="me-2 text-light" />}
          <strong>{location.address || "Ubicación sin dirección"}</strong>
        </div>
        {statusIcons[location.status]}
      </Card.Header>
      <Card.Body>
        <Container>
          <Row className="mb-2">
            <Col xs={12} className="text-muted">
              <GeoAltFill className="me-1 text-muted" />
              {location.city}, {location.state}, {location.country}
            </Col>
          </Row>
          {location.coordinates.latitude && location.coordinates.longitude && (
            <Row className="mb-3">
              <Col>
                <iframe
                  title="Ubicación en el mapa"
                  src={`https://www.google.com/maps?q=${location.coordinates.latitude},${location.coordinates.longitude}&output=embed`}
                  className="w-100 rounded border"
                  style={{ height: "180px" }}
                  loading="lazy"
                ></iframe>
              </Col>
            </Row>
          )}
          {location.comment && (
            <Row>
              <Col>
                <Badge bg="info" className="p-2 text-white">Comentario</Badge>
                <Card.Text className="fst-italic text-secondary mt-1">"{location.comment}"</Card.Text>
              </Col>
            </Row>
          )}
        </Container>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item className="text-center">Última actualización: {new Date().toLocaleDateString()}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default LocationCard;
