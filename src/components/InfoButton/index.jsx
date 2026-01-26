import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

const InfoButton = ({ textInfo, color = "primary", classButton }) => {

  let buttonClassNames = `btn btn-link p-0 position-absolute top-0 end-0 text-${color}`


  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{textInfo}</Tooltip>}
    >
      <button
        className={classButton ? classButton : buttonClassNames}
        aria-label="Información"
      >
        <InfoCircle className="fs-5" />
      </button>
    </OverlayTrigger>
  );
};

export default InfoButton;
