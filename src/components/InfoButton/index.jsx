import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

const InfoButton = ({ textInfo }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          {textInfo}
        </Tooltip>
      }
    >
      <button
        className="btn btn-link p-0 position-absolute"
        style={{
          top: "0",
          right: "0",
          fontSize: "1.2rem",
          color: "#007bff",
        }}
        aria-label="Información"
      >
        <InfoCircle />
      </button>
    </OverlayTrigger>
  );
};

export default InfoButton;
