import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

const InfoButton = ({ textInfo, color = "primary" }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{textInfo}</Tooltip>}
    >
      <button
        className={`btn btn-link p-0 position-absolute top-0 end-0 text-${color}`}
        aria-label="Información"
      >
        <InfoCircle className="fs-5" />
      </button>
    </OverlayTrigger>
  );
};

export default InfoButton;
