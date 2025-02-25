import { memo, useEffect, useState } from "react";
import { Card, Badge, Image, Spinner, OverlayTrigger, Popover } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { UsersService } from "../../apis/clientV2/usersService";

const CardHeaderComponent = memo(function Greeting({ userClientId, dailyOrderNumber }) {
    const [userClient, setUserClient] = useState(null)
    const [loadUserClient, setLoadUserClient] = useState(false)

    const { token } = useAuth()

    const usersService = new UsersService(token)
    useEffect(() => {
        const findUser = async () => {

            const user = await usersService.getByIdUser(userClientId)
            console.log("🚀🚀🚀🚀 haciendo una petición :", user)
            setUserClient(user.body)
            setLoadUserClient(false)
        }
        setLoadUserClient(true)
        findUser()
    }, [token, userClientId])

    console.log("🚀 ~ CardHeaderComponent ~ userClient:", userClient)
    const userName = userClient?.name;
    const profilePicture = userClient?.photoUrl;
    const orderNumber = dailyOrderNumber;

    const popover = (
        <Popover id="popover-profile">
            <Popover.Header as="h3">{userName || "Sin nombre"}</Popover.Header>
            <Popover.Body>
                <strong>Información del usuario:</strong> Aquí puedes agregar más detalles del usuario.
            </Popover.Body>
        </Popover>
    );

    return (
        <Card.Header className="d-flex justify-content-between align-items-center">
            {/* Sección izquierda: nombre de usuario y número de pedido */}
            <Badge bg="success" pill style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
                <small>{orderNumber || "#"}</small>
            </Badge>

            <h5 className="mb-0 ml-2">
                {loadUserClient ? <Spinner animation="border" size="sm" /> : (userName || "Sin nombre")}
            </h5>

            {/* Sección derecha: foto de perfil y botón de más info */}
            <div className="d-flex align-items-center">
                {loadUserClient ? (
                    <Spinner animation="border" size="sm" />
                ) : (
                    <OverlayTrigger trigger="click" placement="auto" overlay={popover} container={document.body}>
                        <Image
                            src={profilePicture || "https://i.pravatar.cc/300"}
                            alt="Foto de perfil del usuario actual"
                            className="rounded-circle"
                            width="40"
                            height="40"
                            style={{ cursor: "pointer" }}
                        />
                    </OverlayTrigger>
                )}
            </div>
        </Card.Header>
    );
})

export default CardHeaderComponent;
