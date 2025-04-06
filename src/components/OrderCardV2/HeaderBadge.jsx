import React from "react";
import { Badge } from "react-bootstrap";

const HeaderBadge = ({ createdAt, kitchen }) => {
    const formattedTime = new Date(createdAt).toLocaleTimeString("Es-Co", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div className="d-flex flex-column align-items-start me-3">
            <Badge bg="info" style={{ fontSize: "0.85rem", padding: "5px 10px" }}>
                {formattedTime}
            </Badge>
            {kitchen && (
                <Badge bg="secondary" style={{ fontSize: "0.75rem", padding: "3px 6px", marginTop: "4px" }}>
                    {kitchen.name}
                </Badge>
            )}
        </div>
    );
};

export default HeaderBadge;
