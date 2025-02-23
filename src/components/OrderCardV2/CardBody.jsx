import { Accordion, Alert, Card } from "react-bootstrap";

function CardBodyComponent({ comentarios, direccion, productos }) {
    return (
        <Card.Body>
            {/* comentario del ciente */}
            {comentarios &&
                <Alert variant="warning">
                    {comentarios}
                </Alert>
            }
            {/* direccion */}
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{direccion || "sin direccion"}</Accordion.Header>
                    <Accordion.Body>
                        Ubicaion: <strong>Google Maps</strong>
                        id: <strong>123456</strong>
                        fotos: <strong>3</strong>
                        costo del domiclio
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* productos */}
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{productos || "producots"}</Accordion.Header>
                    <Accordion.Body>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Card.Body>
    );
}

export default CardBodyComponent;
