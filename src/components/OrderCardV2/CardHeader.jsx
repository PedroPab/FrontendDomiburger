import { Card, Badge, Image } from "react-bootstrap";

function CardHeaderComponent({ userName, orderNumber, profilePicture }) {
    return (
        <Card.Header className="d-flex justify-content-between align-items-center">
            {/* Sección izquierda: nombre de usuario y número de pedido */}
            <Badge bg="success" pill style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
                <small>{orderNumber || "#"}</small>
            </Badge>

            <h5 className="mb-0 ml-2">{userName || "Sin nombre"}</h5>

            {/* Sección derecha: foto de perfil y botón de más info */}
            <div className="d-flex align-items-center">
                <Image
                    src={profilePicture || "https://i.pravatar.cc/300"}
                    alt="Foto de perfil del usuario actual"
                    style={{
                        width: "40px",
                        height: "40px",
                    }}
                    roundedCircle
                />
            </div>
        </Card.Header>
    );
}

export default CardHeaderComponent;
